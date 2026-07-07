// lib/paypal.ts

const isLive = process.env.PAYPAL_MODE === "live";

const PAYPAL_CLIENT = isLive
  ? process.env.PAYPAL_CLIENT_ID
  : process.env.PAYPAL_SANDBOX_CLIENT_ID;

const PAYPAL_SECRET = isLive
  ? process.env.PAYPAL_SECRET
  : process.env.PAYPAL_SANDBOX_SECRET;

const PAYPAL_API = isLive
  ? process.env.PAYPAL_BASE_URL
  : process.env.PAYPAL_SANDBOX_BASE_URL;

if (!PAYPAL_CLIENT || !PAYPAL_SECRET || !PAYPAL_API) {
  throw new Error("PayPal environment variables are not configured.");
}

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `PayPal authentication failed: ${
        data.error_description ?? data.error ?? "Unknown error"
      }`
    );
  }

  return data.access_token;
}

export async function createOrder(amount: number) {
  const token = await getAccessToken();

  const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",

      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toFixed(2),
          },
        },
      ],

      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}

export async function captureOrder(orderId: string) {
  const token = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // <-- AGREGA ESTA LÍNEA CUALQUIER POST A PAYPAL V2
      },
      // Nota: No necesitas pasar un body aquí, PayPal solo requiere el header.
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
}
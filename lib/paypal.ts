const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET!;
const PAYPAL_API = process.env.PAYPAL_BASE_URL!;

async function getAccessToken() {
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
                return_url:
                    `${process.env.NEXT_PUBLIC_APP_URL}/success`,
                cancel_url:
                    `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
            },
        }),
    });

    return response.json();
}

export async function captureOrder(orderId: string) {
    const token = await getAccessToken();

    const response = await fetch(
        `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.json();
}
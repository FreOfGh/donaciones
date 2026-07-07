"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const capture = async () => {
      console.log("PayPal Token:", token);

      if (!token) {
        console.error("No token received from PayPal.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: token,
          }),
        });

        const data = await response.json();

        console.log("Capture Status:", response.status);
        console.log("Capture Response:", data);

        if (response.ok && data.status === "COMPLETED") {
          setSuccess(true);
        } else {
          console.error("Capture failed:", data);
        }
      } catch (error) {
        console.error("Capture Exception:", error);
      } finally {
        setLoading(false);
      }
    };

    capture();
  }, [token]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-50 px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-2xl">
        {loading && (
          <>
            <Loader2 className="mx-auto h-20 w-20 animate-spin text-sky-600" />

            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Confirming your donation...
            </h2>

            <p className="mt-3 text-gray-500">
              Please wait while we verify your payment.
            </p>
          </>
        )}

        {!loading && success && (
          <>
            <CheckCircle className="mx-auto h-24 w-24 text-green-500" />

            <h1 className="mt-6 text-4xl font-bold text-gray-900">
              Thank You!
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Your donation has been successfully received.
            </p>

            <p className="mt-4 leading-7 text-gray-500">
              Thanks to generous supporters like you, we can continue providing
              educational opportunities and resources for children and young
              people.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-xl bg-sky-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-sky-700"
            >
              Return Home
            </Link>
          </>
        )}

        {!loading && !success && (
          <>
            <XCircle className="mx-auto h-24 w-24 text-red-500" />

            <h1 className="mt-6 text-4xl font-bold text-red-600">
              Payment Not Confirmed
            </h1>

            <p className="mt-4 text-gray-600">
              We couldn't confirm your donation.
            </p>

            <p className="mt-2 text-gray-500">
              If the payment was completed, please contact us and we'll be
              happy to help.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-xl bg-sky-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-sky-700"
            >
              Return Home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
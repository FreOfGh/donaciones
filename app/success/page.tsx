"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Success() {
  const params = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const capturePayment = async () => {
      const token = params.get("token");

      if (!token) {
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

        if (response.ok && data.status === "COMPLETED") {
          setSuccess(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    capturePayment();
  }, [params]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-2xl">
        {loading ? (
          <>
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>

            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Confirming your donation...
            </h2>

            <p className="mt-3 text-gray-500">
              Please wait while we verify your payment with PayPal.
            </p>
          </>
        ) : success ? (
          <>
            <CheckCircle className="mx-auto h-24 w-24 text-green-500" />

            <h1 className="mt-6 text-4xl font-bold text-gray-900">
              Thank You!
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Your donation has been successfully received.
            </p>

            <p className="mt-4 text-gray-500">
              Every contribution helps us continue supporting educational
              programs and creating new opportunities for children and young
              people.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-xl bg-sky-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-sky-700"
            >
              Back to Home
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
              <span className="text-5xl">❌</span>
            </div>

            <h1 className="mt-6 text-3xl font-bold text-red-600">
              Payment could not be confirmed
            </h1>

            <p className="mt-4 text-gray-600">
              We couldn't verify your donation.
            </p>

            <p className="mt-2 text-gray-500">
              If you believe the payment was completed, please contact us or
              try again in a few minutes.
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


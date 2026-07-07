"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function capture() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        console.log("Token:", token);

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

        console.log(data);

        if (response.ok && data.status === "COMPLETED") {
          setSuccess(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    capture();
  }, [token]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-sky-600" />
      </main>
    );
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <CheckCircle className="mx-auto h-24 w-24 text-green-500" />

          <h1 className="mt-6 text-4xl font-bold">
            Thank you!
          </h1>

          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-sky-600 px-8 py-4 text-white"
          >
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <XCircle className="mx-auto h-24 w-24 text-red-500" />

        <h1 className="mt-6 text-4xl font-bold">
          Payment Not Confirmed
        </h1>
      </div>
    </main>
  );
}
import { NextRequest, NextResponse } from "next/server";
import { captureOrder } from "@/lib/paypal";

export async function POST(req: NextRequest) {
    const { orderId } = await req.json();

    const result = await captureOrder(orderId);

    return NextResponse.json(result);
}
import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal";

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Monto inválido" },
                { status: 400 }
            );
        }

        const order = await createOrder(amount);

        const approve = order.links.find(
            (l: any) => l.rel === "approve"
        );

        return NextResponse.json({
            approveUrl: approve.href,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Error creando la orden" },
            { status: 500 }
        );
    }
}
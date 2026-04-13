import { NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "sk_test_your_key_here";
const ACADEMY_EMAIL = process.env.ACADEMY_EMAIL || "academy@deboik.com";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: 5000000, // ₦50,000 in kobo
        currency: "NGN",
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/enroll/success`,
        metadata: {
          name,
          course: "Universal JS Course",
          price: 50000,
        },
        reference: `DEBOIK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || "Payment initialization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "An error occurred during payment initialization" },
      { status: 500 }
    );
  }
}
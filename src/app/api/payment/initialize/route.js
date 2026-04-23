import { NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "sk_test_your_key_here";
const ACADEMY_EMAIL = process.env.ACADEMY_EMAIL || "academy@deboik.com";

export async function POST(request) {

  try {
    const body = await request.json();
    console.log("Incoming Request Body:", body);

    const { name, email, phone, classType, pricingType, selectedModules, totalAmount } = body;

    // Validation
    if (!name || !email || !phone || !classType || !pricingType) {
      return NextResponse.json(
        { error: "Name, email, phone, class type, and pricing type are required" },
        { status: 400 }
      );
    }

    // Validate individual module selection
    if (pricingType === "individual" && (!selectedModules || selectedModules.length === 0)) {
      return NextResponse.json(
        { error: "Please select at least one module for individual pricing" },
        { status: 400 }
      );
    }

    // Calculate amount in kobo (Paystack uses kobo = 1/100 of NGN)
    const amountInKobo = totalAmount * 100;

    // Generate course description based on pricing type
    let courseDescription = "";
    let modulesList = [];

    if (pricingType === "fullstack") {
      courseDescription = "Fullstack JavaScript Course (All Modules)";
      modulesList = [
        "JavaScript Fundamentals",
        "Node.js (Backend)",
        "React (Frontend)",
        "Next.js",
        "React Native (Mobile)",
        "Electron (Desktop)"
      ];
    } else {
      // Map selected module IDs to names
      const moduleNames = {
        js: "JavaScript Fundamentals",
        node: "Node.js (Backend)",
        react: "React (Frontend)",
        nextjs: "Next.js",
        reactnative: "React Native (Mobile)",
        electron: "Electron (Desktop)"
      };

      modulesList = selectedModules.map(id => moduleNames[id]);
      courseDescription = `Individual Modules: ${modulesList.join(", ")}`;
    }

    // Generate unique reference
    const reference = `DEBOIK-${pricingType === "fullstack" ? "FS" : "IND"}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        currency: "NGN",
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/enroll/success`,
        metadata: {
          name,
          phone,
          classType,
          pricingType,
          selectedModules: modulesList,
          course: courseDescription,
          totalAmount: totalAmount,
          modulesCount: pricingType === "individual" ? selectedModules.length : 6,
        },
        reference: reference,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      console.error("Paystack Error:", data.message);
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
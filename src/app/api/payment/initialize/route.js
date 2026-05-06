import { NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const MODULE_NAMES = {
  js:          "JavaScript Fundamentals",
  node:        "Node.js (Backend)",
  react:       "React (Frontend)",
  nextjs:      "Next.js",
  reactnative: "React Native (Mobile)",
  electron:    "Electron (Desktop)",
};

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name, email, phone, classType,
      pricingType, selectedModules,
      totalAmount, paymentPlan,
      isInstallment, firstInstallmentAmount,
      earlyBirdUsed, cohortId,
    } = body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!name || !email || !phone || !classType || !pricingType) {
      return NextResponse.json(
        { error: "Name, email, phone, class type, and pricing type are required" },
        { status: 400 }
      );
    }
    if (pricingType === "individual" && (!selectedModules || selectedModules.length === 0)) {
      return NextResponse.json(
        { error: "Please select at least one module for individual pricing" },
        { status: 400 }
      );
    }
    if (!PAYSTACK_SECRET_KEY) {
      console.error("PAYSTACK_SECRET_KEY is not set");
      return NextResponse.json({ error: "Payment service is not configured" }, { status: 500 });
    }

    // ── Amount ───────────────────────────────────────────────────────────────
    // Charge only the first installment if on an installment plan,
    // otherwise charge the full amount. Convert to kobo for Paystack.
    const chargeAmount = isInstallment ? firstInstallmentAmount : totalAmount;
    const amountInKobo = chargeAmount * 100;

    // ── Description ──────────────────────────────────────────────────────────
    let courseDescription, modulesList;

    if (pricingType === "fullstack") {
      modulesList      = Object.values(MODULE_NAMES);
      courseDescription = earlyBirdUsed
        ? `Fullstack JS Course — Early Bird (${paymentPlan ?? "full_payment"})`
        : `Fullstack JS Course (${paymentPlan ?? "full_payment"})`;
    } else {
      modulesList      = (selectedModules ?? []).map(id => MODULE_NAMES[id] ?? id);
      courseDescription = `Individual Modules: ${modulesList.join(", ")}`;
    }

    // ── Reference ────────────────────────────────────────────────────────────
    const tag       = pricingType === "fullstack" ? "FS" : "IND";
    const reference = `DEBOIK-${tag}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    // ── Paystack request ─────────────────────────────────────────────────────
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method:  "POST",
      headers: {
        Authorization:  `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount:       amountInKobo,
        currency:     "NGN",
        callback_url: `${BASE_URL}/enroll/success`,
        reference,
        metadata: {
          name,
          phone,
          classType,
          pricingType,
          paymentPlan:          paymentPlan ?? null,
          isInstallment:        isInstallment ?? false,
          chargeAmount,          // what was actually charged today
          totalCourseAmount:    totalAmount,  // full course price
          earlyBirdUsed:        earlyBirdUsed ?? false,
          cohortId:             cohortId ?? null,
          selectedModules:      modulesList,
          course:               courseDescription,
          modulesCount:         pricingType === "individual" ? (selectedModules?.length ?? 0) : 6,
        },
      }),
    });

    const data = await paystackRes.json();

    if (!data.status) {
      console.error("Paystack error:", data.message);
      return NextResponse.json(
        { error: data.message || "Payment initialization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference:        data.data.reference,
    });

  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "An error occurred during payment initialization" },
      { status: 500 }
    );
  }
}
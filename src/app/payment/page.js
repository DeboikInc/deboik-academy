"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  IoLockClosed,
  IoCheckmarkCircle,
  IoCard,
  IoShieldCheckmark,
  IoChevronBack,
  IoAlertCircle,
  IoPerson,
  IoMail,
  IoCall,
} from "react-icons/io5";
import Link from "next/link";

const ORDER_SUMMARY = {
  title: "Universal JavaScript Course",
  modules: ["JavaScript Fundamentals", "Backend with Node.js", "Frontend with React"],
  features: ["6 Real-world Projects", "Lifetime Access", "Completion Certificate"],
  originalPrice: 100000,
  discountedPrice: 50000,
  savings: 50000,
};

export default function PaymentPage() {
  const [step, setStep] = useState(1); // 1 = details, 2 = payment, 3 = success
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const validate = (data, fields) => {
    const errs = {};
    fields.forEach((f) => {
      if (!data[f] || data[f].trim() === "") errs[f] = "This field is required";
    });
    if (fields.includes("email") && data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      errs.email = "Enter a valid email address";
    }
    if (fields.includes("cardNumber") && data.cardNumber && data.cardNumber.replace(/\s/g, "").length < 16) {
      errs.cardNumber = "Enter a valid 16-digit card number";
    }
    if (fields.includes("expiry") && data.expiry && !/^\d{2}\/\d{2}$/.test(data.expiry)) {
      errs.expiry = "Format: MM/YY";
    }
    if (fields.includes("cvv") && data.cvv && data.cvv.length < 3) {
      errs.cvv = "Enter a valid CVV";
    }
    return errs;
  };

  const handleDetailsNext = () => {
    const errs = validate(details, ["fullName", "email", "phone"]);
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    setStep(2);
  };

  const handlePayment = () => {
    const errs = validate(payment, ["cardNumber", "expiry", "cvv", "cardName"]);
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2200);
  };

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <main className="min-h-screen bg-academy-dark">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back link */}
          {step < 3 && (
            <Link
              href="/course"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-academy-yellow transition-colors mb-8 group"
            >
              <IoChevronBack className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back to Course</span>
            </Link>
          )}

          {/* Progress Steps */}
          {step < 3 && (
            <div className="flex items-center justify-center space-x-4 mb-12">
              {["Your Details", "Payment"].map((label, i) => {
                const num = i + 1;
                const active = step === num;
                const done = step > num;
                return (
                  <div key={label} className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                          done
                            ? "bg-academy-yellow border-academy-yellow text-academy-dark"
                            : active
                            ? "border-academy-yellow text-academy-yellow bg-academy-primary/20"
                            : "border-gray-600 text-gray-500"
                        }`}
                      >
                        {done ? <IoCheckmarkCircle className="text-lg" /> : num}
                      </div>
                      <span
                        className={`text-sm font-medium hidden sm:block ${
                          active ? "text-white" : done ? "text-academy-yellow" : "text-gray-500"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < 1 && (
                      <div
                        className={`w-16 sm:w-24 h-px mx-4 transition-all duration-500 ${
                          step > 1 ? "bg-academy-yellow" : "bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className={`grid gap-8 ${step < 3 ? "grid-cols-1 lg:grid-cols-5" : "grid-cols-1"}`}>

            {/* ── LEFT: Form ── */}
            {step < 3 && (
              <div className="lg:col-span-3">

                {/* Step 1 — Personal Details */}
                {step === 1 && (
                  <div className="academy-card rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Your Details</h2>
                    <p className="text-gray-400 text-sm mb-8">
                      Tell us a bit about yourself to get started.
                    </p>

                    <div className="space-y-6">
                      <Field
                        icon={<IoPerson />}
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        value={details.fullName}
                        error={errors.fullName}
                        onChange={(v) => setDetails({ ...details, fullName: v })}
                      />
                      <Field
                        icon={<IoMail />}
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={details.email}
                        error={errors.email}
                        onChange={(v) => setDetails({ ...details, email: v })}
                      />
                      <Field
                        icon={<IoCall />}
                        label="Phone Number"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={details.phone}
                        error={errors.phone}
                        onChange={(v) => setDetails({ ...details, phone: v })}
                      />
                    </div>

                    <button
                      onClick={handleDetailsNext}
                      className="btn-primary w-full mt-8 text-center text-lg"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {/* Step 2 — Payment */}
                {step === 2 && (
                  <div className="academy-card rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Payment Details</h2>
                    <p className="text-gray-400 text-sm mb-8">
                      Your payment is encrypted and 100% secure.
                    </p>

                    {/* Card preview */}
                    <div className="relative mb-8 h-44 rounded-2xl overflow-hidden select-none"
                      style={{
                        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                        border: "1px solid rgba(255,200,0,0.2)",
                        boxShadow: "0 0 40px rgba(255,200,0,0.05)",
                      }}
                    >
                      {/* decorative circles */}
                      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-academy-yellow/10" />
                      <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full border border-academy-yellow/10" />
                      <div className="absolute bottom-4 left-6 right-6">
                        <p className="text-white font-mono text-xl tracking-widest mb-3">
                          {payment.cardNumber || "•••• •••• •••• ••••"}
                        </p>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Cardholder</p>
                            <p className="text-white text-sm font-medium">
                              {payment.cardName || "YOUR NAME"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Expires</p>
                            <p className="text-white text-sm">{payment.expiry || "MM/YY"}</p>
                          </div>
                        </div>
                      </div>
                      {/* chip */}
                      <div className="absolute top-6 left-6 w-10 h-7 rounded bg-gradient-to-br from-yellow-300/80 to-yellow-600/80" />
                    </div>

                    <div className="space-y-5">
                      <Field
                        icon={<IoCard />}
                        label="Card Number"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={payment.cardNumber}
                        error={errors.cardNumber}
                        onChange={(v) => setPayment({ ...payment, cardNumber: formatCard(v) })}
                        maxLength={19}
                      />
                      <Field
                        icon={<IoPerson />}
                        label="Name on Card"
                        type="text"
                        placeholder="As it appears on your card"
                        value={payment.cardName}
                        error={errors.cardName}
                        onChange={(v) => setPayment({ ...payment, cardName: v })}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Field
                          label="Expiry Date"
                          type="text"
                          placeholder="MM/YY"
                          value={payment.expiry}
                          error={errors.expiry}
                          onChange={(v) => setPayment({ ...payment, expiry: formatExpiry(v) })}
                          maxLength={5}
                        />
                        <Field
                          label="CVV"
                          type="password"
                          placeholder="•••"
                          value={payment.cvv}
                          error={errors.cvv}
                          onChange={(v) =>
                            setPayment({ ...payment, cvv: v.replace(/\D/g, "").slice(0, 4) })
                          }
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <IoShieldCheckmark className="text-green-400 text-xl flex-shrink-0" />
                      <p className="text-green-400 text-sm">
                        256-bit SSL encryption. Your card details are never stored.
                      </p>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="btn-primary w-full mt-6 text-center text-lg relative overflow-hidden"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center space-x-2">
                          <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>Processing Payment...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center space-x-2">
                          <IoLockClosed />
                          <span>Pay ₦50,000 Now</span>
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => { setStep(1); setErrors({}); }}
                      className="w-full mt-3 text-gray-400 hover:text-white text-sm text-center py-2 transition-colors"
                    >
                      ← Back to Your Details
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── RIGHT: Order Summary ── */}
            {step < 3 && (
              <div className="lg:col-span-2">
                <div className="academy-card rounded-2xl p-6 sticky top-28">
                  <h3 className="text-white font-bold text-lg mb-1">{ORDER_SUMMARY.title}</h3>
                  <p className="text-gray-400 text-sm mb-5">Complete JavaScript Bootcamp</p>

                  <div className="space-y-2 mb-5">
                    {ORDER_SUMMARY.modules.map((m) => (
                      <div key={m} className="flex items-center space-x-2">
                        <IoCheckmarkCircle className="text-academy-yellow text-sm flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-academy-primary/20 pt-4 mb-5 space-y-2">
                    {ORDER_SUMMARY.features.map((f) => (
                      <div key={f} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-academy-yellow flex-shrink-0" />
                        <span className="text-gray-400 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-academy-primary/20 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Original Price</span>
                      <span className="text-gray-400 line-through">₦{ORDER_SUMMARY.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">Early Bird Discount</span>
                      <span className="text-green-400">−₦{ORDER_SUMMARY.savings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-academy-primary/20">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-academy-yellow text-2xl font-bold">
                        ₦{ORDER_SUMMARY.discountedPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 p-3 bg-academy-primary/10 rounded-xl border border-academy-yellow/10">
                    <p className="text-academy-yellow text-xs text-center font-medium">
                      🔥 Early Bird Offer — 50% off for a limited time
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── SUCCESS STATE ── */}
            {step === 3 && (
              <div className="max-w-lg mx-auto w-full text-center">
                <div className="academy-card rounded-2xl p-12">
                  {/* Animated checkmark */}
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full bg-academy-yellow/10 animate-ping" />
                    <div className="relative w-24 h-24 rounded-full bg-academy-yellow/20 flex items-center justify-center border-2 border-academy-yellow">
                      <IoCheckmarkCircle className="text-academy-yellow text-5xl" />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-3">
                    Payment Successful! 🎉
                  </h2>
                  <p className="text-gray-400 mb-2">
                    Welcome aboard, <span className="text-white font-semibold">{details.fullName}</span>!
                  </p>
                  <p className="text-gray-400 text-sm mb-8">
                    A confirmation email has been sent to{" "}
                    <span className="text-academy-yellow">{details.email}</span>
                  </p>

                  <div className="bg-academy-dark/50 rounded-xl p-5 mb-8 text-left space-y-3 border border-academy-primary/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Course</span>
                      <span className="text-white">Universal JavaScript Course</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Amount Paid</span>
                      <span className="text-academy-yellow font-bold">₦50,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Access</span>
                      <span className="text-green-400">Lifetime</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Order Ref</span>
                      <span className="text-white font-mono">UJS-{Math.random().toString(36).slice(2, 9).toUpperCase()}</span>
                    </div>
                  </div>

                  <Link href="/dashboard" className="btn-primary w-full text-center block text-lg mb-3">
                    Go to My Dashboard
                  </Link>
                  <Link href="/" className="block text-gray-400 hover:text-white text-sm transition-colors">
                    Return to Home
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ── Reusable Field Component ── */
function Field({ icon, label, type, placeholder, value, error, onChange, maxLength }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-academy-dark border rounded-xl py-3.5 text-white placeholder-gray-600 text-sm outline-none transition-all duration-200
            focus:border-academy-yellow focus:ring-2 focus:ring-academy-yellow/20
            ${icon ? "pl-11 pr-4" : "px-4"}
            ${error ? "border-red-500/60 bg-red-500/5" : "border-academy-primary/30 hover:border-academy-primary/60"}`}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-red-400 text-xs flex items-center space-x-1">
          <IoAlertCircle />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
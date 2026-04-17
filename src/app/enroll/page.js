"use client";

import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";

const ENROLL_FEATURES = [
  "JavaScript Fundamentals",
  "Backend Development (Node.js)",
  "Frontend Development (React)",
  "Mobile Development (React Native)",
  "Desktop Development (Electron)",
  "Internship Opportunity",
  "Completion Certificate",
  "Hybrid Learning (Online / Offline)",
];

export default function Enroll() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    classType: "online",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Valid phone number is required";
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      } else {
        alert("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-academy-dark">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Enroll in <span className="text-gradient">Deboik Academy</span>
            </h1>
            <p className="text-xl text-gray-400">Complete your registration to start learning</p>
          </div>

          {/* Step indicators */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center gap-4">
              {[
                { n: 1, label: "Choose Plan" },
                { n: 2, label: "Your Info" },
              ].map(({ n, label }, idx) => (
                <div key={n} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        step >= n
                          ? "bg-academy-yellow text-academy-dark"
                          : "bg-academy-primary/20 text-gray-400"
                      }`}
                    >
                      {n}
                    </div>
                    <span className={`text-sm ${step >= n ? "text-white" : "text-gray-500"}`}>
                      {label}
                    </span>
                  </div>
                  {idx === 0 && (
                    <div className={`w-12 h-px ${step === 2 ? "bg-academy-yellow" : "bg-academy-primary/20"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-academy-deep/50 rounded-2xl border border-academy-primary/20 overflow-hidden">

              {/* Step 1 — Pricing Card */}
              {step === 1 && (
                <div className="p-8">
                  <PricingCard
                    originalPrice={650000}
                    discountPrice={450000}
                    features={ENROLL_FEATURES}
                    onContinue={() => setStep(2)}
                    ctaLabel="Continue to Registration →"
                  />
                </div>
              )}

              {/* Step 2 — Registration Form */}
              {step === 2 && (
                <div className="p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Your Information</h2>
                    <button
                      onClick={() => setStep(1)}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Back"
                    >
                      <IoArrowBack size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm font-medium">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full bg-academy-dark border ${
                          errors.name ? "border-red-500" : "border-academy-primary/30"
                        } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-primary transition-colors`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full bg-academy-dark border ${
                          errors.email ? "border-red-500" : "border-academy-primary/30"
                        } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-primary transition-colors`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm font-medium">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className={`w-full bg-academy-dark border ${
                          errors.phone ? "border-red-500" : "border-academy-primary/30"
                        } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-primary transition-colors`}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Class Format */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Class Format</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["online", "offline"].map((type) => (
                          <label
                            key={type}
                            className={`relative flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              formData.classType === type
                                ? "border-academy-yellow bg-academy-yellow/10"
                                : "border-academy-primary/30 hover:border-academy-primary/60 bg-academy-dark"
                            }`}
                          >
                            <input
                              type="radio"
                              name="classType"
                              value={type}
                              checked={formData.classType === type}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, classType: e.target.value }))
                              }
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                formData.classType === type ? "border-academy-yellow" : "border-gray-500"
                              }`}
                            >
                              {formData.classType === type && (
                                <div className="w-2 h-2 rounded-full bg-academy-yellow" />
                              )}
                            </div>
                            <div>
                              <p
                                className={`text-sm font-semibold capitalize ${
                                  formData.classType === type ? "text-academy-yellow" : "text-white"
                                }`}
                              >
                                {type}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {type === "online" ? "Learn from anywhere" : "In-person sessions"}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Processing..." : "Proceed to Payment — ₦450,000"}
                    </button>
                  </form>

                  <p className="text-gray-500 text-xs text-center mt-4">
                    Secure payment powered by Paystack
                  </p>
                </div>
              )}
            </div>

            <div className="text-center mt-8">
              <Link href="/" className="text-gray-400 hover:text-academy-yellow transition-colors text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
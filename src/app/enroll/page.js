"use client";

import { useState } from "react";
import { IoCheckmarkCircle, IoClose, IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Enroll() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

          <div className="max-w-md mx-auto">
            <div className="bg-academy-deep/50 rounded-2xl p-8 border border-academy-primary/20">
              {step === 1 && (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Course Details</h2>
                    <p className="text-gray-400">Universal JavaScript Course</p>
                  </div>

                  <div className="bg-academy-dark/50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Original Price</span>
                      <span className="text-gray-500 line-through">₦100,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Early Bird Price</span>
                      <span className="text-2xl font-bold text-academy-yellow">₦50,000</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center space-x-3 text-gray-300">
                      <IoCheckmarkCircle className="text-academy-yellow" />
                      <span>JavaScript Fundamentals</span>
                    </li>
                    <li className="flex items-center space-x-3 text-gray-300">
                      <IoCheckmarkCircle className="text-academy-yellow" />
                      <span>Backend (Node.js)</span>
                    </li>
                    <li className="flex items-center space-x-3 text-gray-300">
                      <IoCheckmarkCircle className="text-academy-yellow" />
                      <span>Frontend (React)</span>
                    </li>
                    <li className="flex items-center space-x-3 text-gray-300">
                      <IoCheckmarkCircle className="text-academy-yellow" />
                      <span>Lifetime Access</span>
                    </li>
                    <li className="flex items-center space-x-3 text-gray-300">
                      <IoCheckmarkCircle className="text-academy-yellow" />
                      <span>Certificate</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary w-full"
                  >
                    Continue to Registration
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Your Information</h2>
                    <button
                      onClick={() => setStep(1)}
                      className="text-gray-400 hover:text-white"
                    >
                      <IoArrowBack size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full bg-academy-dark border ${
                          errors.name ? "border-red-500" : "border-academy-primary/30"
                        } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-primary`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full bg-academy-dark border ${
                          errors.email ? "border-red-500" : "border-academy-primary/30"
                        } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-primary`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full mt-6 disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Proceed to Payment - ₦50,000"}
                    </button>
                  </form>

                  <p className="text-gray-500 text-sm text-center mt-4">
                    Secure payment powered by Paystack
                  </p>
                </>
              )}
            </div>

            <div className="text-center mt-8">
              <Link href="/" className="text-gray-400 hover:text-academy-yellow">
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
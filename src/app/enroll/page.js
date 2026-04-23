"use client";

import { useState } from "react";
import { IoArrowBack, IoCheckmarkCircle } from "react-icons/io5";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FULLSTACK_FEATURES = [
  "JavaScript Fundamentals",
  "Backend Development (Node.js)",
  "Frontend Web Development (React or Next.js)",
  "Mobile Development (React Native)",
  "Desktop Development (Electron)",
  "Internship Opportunity",
  "Completion Certificate",
  "Hybrid Learning (Online / Offline)",
];

const INDIVIDUAL_MODULES = [
  { id: "js", name: "JavaScript Fundamentals", price: 250000, icon: "📘" },
  { id: "node", name: "Node.js (Express.js)", price: 350000, icon: "🚀" },
  { id: "react", name: "React (Frontend)", price: 350000, icon: "⚛️" },
  { id: "nextjs", name: "Next.js (Fullstack Web Framework)", price: 550000, icon: "▲" },
  { id: "reactnative", name: "React Native (Mobile)", price: 350000, icon: "📱" },
  { id: "electron", name: "Electron (Desktop)", price: 350000, icon: "💻" },
];

export default function Enroll() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pricingType, setPricingType] = useState("fullstack"); // "fullstack" or "individual"
  const [selectedModules, setSelectedModules] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    classType: "online",
    pricingType: "fullstack",
    selectedModules: [],
    totalAmount: 450000,
  });
  const [errors, setErrors] = useState({});

  // Calculate total price for individual modules
  const calculateTotal = (modules) => {
    return modules.reduce((total, moduleId) => {
      const module = INDIVIDUAL_MODULES.find(m => m.id === moduleId);
      return total + (module?.price || 0);
    }, 0);
  };

  const handleModuleToggle = (moduleId) => {
    setSelectedModules(prev => {
      let newSelection;
      if (prev.includes(moduleId)) {
        newSelection = prev.filter(id => id !== moduleId);
      } else {
        newSelection = [...prev, moduleId];
      }
      const newTotal = calculateTotal(newSelection);
      setFormData(prevData => ({
        ...prevData,
        selectedModules: newSelection,
        totalAmount: newTotal
      }));
      return newSelection;
    });
  };

  const handlePricingTypeChange = (type) => {
    setPricingType(type);
    setFormData(prev => ({
      ...prev,
      pricingType: type,
      selectedModules: type === "fullstack" ? [] : selectedModules,
      totalAmount: type === "fullstack" ? 450000 : calculateTotal(selectedModules)
    }));
  };

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
    if (pricingType === "individual" && selectedModules.length === 0) {
      newErrors.modules = "Please select at least one module";
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
        body: JSON.stringify({
          ...formData,
          pricingType,
          selectedModules: pricingType === "individual" ? selectedModules : [],
          totalAmount: pricingType === "fullstack" ? 450000 : calculateTotal(selectedModules),
        }),
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
            <p className="text-xl text-gray-400">Choose your learning path and complete registration</p>
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
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= n
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

          <div className="max-w-2xl mx-auto">
            <div className="overflow-hidden">

              {/* Step 1 — Choose Pricing Plan */}
              {step === 1 && (
                <div className="p-8">
                  {/* Pricing Type Toggle */}
                  <div className="flex gap-4 mb-8 bg-academy-deep/30 p-2 rounded-xl">
                    <button
                      onClick={() => handlePricingTypeChange("fullstack")}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${pricingType === "fullstack"
                        ? "bg-academy-yellow text-academy-dark"
                        : "text-gray-400 hover:text-white"
                        }`}
                    >
                      Fullstack Package
                    </button>
                    <button
                      onClick={() => handlePricingTypeChange("individual")}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${pricingType === "individual"
                        ? "bg-academy-yellow text-academy-dark"
                        : "text-gray-400 hover:text-white"
                        }`}
                    >
                      Individual Modules
                    </button>
                  </div>

                  {/* Fullstack Package */}
                  {pricingType === "fullstack" && (
                    <div className="academy-card rounded-2xl p-6 glow-effect">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">Complete Fullstack JS Course</h3>
                        <p className="text-gray-400">All modules included</p>
                        <p className="text-gray-400 text-sm mt-1">One-time payment for the entire course (javascript fundamentals + nodejs + react or next or electron or react native)</p>
                        <div className="mt-4">
                          <span className="text-4xl font-bold text-white">₦450,000</span>
                          <span className="text-gray-400 line-through ml-2">₦650,000</span>
                          <p className="text-academy-yellow text-sm mt-1">Early Bird Pricing</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {FULLSTACK_FEATURES.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <IoCheckmarkCircle className="text-academy-yellow text-sm flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setStep(2)}
                        className="btn-primary w-full text-center block text-lg py-3"
                      >
                        Continue to Registration →
                      </button>
                    </div>
                  )}

                  {/* Individual Modules */}
                  {pricingType === "individual" && (
                    <div className="space-y-6">
                      <p className="text-gray-400 text-center mb-4">
                        Select the modules you want to learn. Each module costs ₦350,000 (except JavaScript Fundamentals at ₦250,000)
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {INDIVIDUAL_MODULES.map((module) => (
                          <label
                            key={module.id}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedModules.includes(module.id)
                              ? "border-academy-yellow bg-academy-yellow/10"
                              : "border-academy-primary/30 hover:border-academy-primary/60 bg-academy-dark"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="text-white font-medium">{module.name}</p>
                                <p className="text-academy-yellow text-sm font-semibold">
                                  ₦{module.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={selectedModules.includes(module.id)}
                              onChange={() => handleModuleToggle(module.id)}
                              className="w-5 h-5 rounded border-academy-primary/30 text-academy-yellow focus:ring-academy-yellow"
                            />
                          </label>
                        ))}
                      </div>

                      {/* Total and Continue Button */}
                      <div className="academy-card rounded-2xl p-6 mt-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-400">Selected Modules:</span>
                          <span className="text-white font-semibold">{selectedModules.length}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-academy-primary/20">
                          <span className="text-xl font-bold text-white">Total Amount:</span>
                          <span className="text-2xl font-bold text-academy-yellow">
                            ₦{calculateTotal(selectedModules).toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            if (selectedModules.length === 0) {
                              setErrors({ modules: "Please select at least one module" });
                            } else {
                              setStep(2);
                            }
                          }}
                          className="btn-primary w-full text-center block text-lg py-3"
                        >
                          Continue to Registration →
                        </button>
                        {errors.modules && (
                          <p className="text-red-400 text-sm text-center mt-3">{errors.modules}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2 — Registration Form */}
              {step === 2 && (
                <div className="p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Your Information</h2>
                      <p className="text-gray-400 text-sm mt-1">
                        {pricingType === "fullstack"
                          ? "Fullstack Package - ₦450,000"
                          : `Individual Modules (${selectedModules.length}) - ₦${calculateTotal(selectedModules).toLocaleString()}`}
                      </p>
                    </div>
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
                        className={`w-full bg-academy-dark border ${errors.name ? "border-red-500" : "border-academy-primary/30"
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
                        className={`w-full bg-academy-dark border ${errors.email ? "border-red-500" : "border-academy-primary/30"
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
                        className={`w-full bg-academy-dark border ${errors.phone ? "border-red-500" : "border-academy-primary/30"
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
                            className={`relative flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${formData.classType === type
                              ? "border-academy-yellow bg-academy-yellow/10"
                              : "border-academy-primary/30 hover:border-academy-primary/60 bg-academy-dark"
                              }`}
                          >
                            <input
                              type="radio"
                              name="classType"
                              disabled
                              value={type}
                              checked={formData.classType === type}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, classType: e.target.value }))
                              }
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${formData.classType === type ? "border-academy-yellow" : "border-gray-500"
                                }`}
                            >
                              {formData.classType === type && (
                                <div className="w-2 h-2 rounded-full bg-academy-yellow" />
                              )}
                            </div>
                            <div>
                              <p
                                className={`text-sm font-semibold capitalize ${formData.classType === type ? "text-academy-yellow" : "text-white"
                                  }`}
                              >
                                {type}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {type === "online" ? "Live Zoom sessions" : "In-person at our facility"}
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
                      {loading
                        ? "Processing..."
                        : `Proceed to Payment — ₦${(pricingType === "fullstack" ? 450000 : calculateTotal(selectedModules)).toLocaleString()}`}
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
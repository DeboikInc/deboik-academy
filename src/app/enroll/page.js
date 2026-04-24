"use client";

import { useState, useEffect } from "react";
import { IoArrowBack, IoCheckmarkCircle, IoSaveOutline, IoTimeOutline, IoLockClosed } from "react-icons/io5";
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
  const [savingLead, setSavingLead] = useState(false);
  const [pricingType, setPricingType] = useState("fullstack");
  const [selectedModules, setSelectedModules] = useState([]);
  const [leadSaved, setLeadSaved] = useState(false);
  const [showSlackError, setShowSlackError] = useState(false);
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

  // Load saved lead data from localStorage on mount - FIXED: Don't auto-set step
  useEffect(() => {
    const savedLead = localStorage.getItem("deboik_lead");
    if (savedLead) {
      try {
        const lead = JSON.parse(savedLead);
        // Only load data if it's recent (within 7 days)
        const savedAt = new Date(lead.savedAt);
        const now = new Date();
        const daysDiff = (now - savedAt) / (1000 * 60 * 60 * 24);

        if (daysDiff < 7) {
          if (lead.name) setFormData(prev => ({ ...prev, name: lead.name }));
          if (lead.email) setFormData(prev => ({ ...prev, email: lead.email }));
          if (lead.phone) setFormData(prev => ({ ...prev, phone: lead.phone }));
          if (lead.classType) setFormData(prev => ({ ...prev, classType: lead.classType }));
          if (lead.pricingType) {
            setPricingType(lead.pricingType);
            setFormData(prev => ({ ...prev, pricingType: lead.pricingType }));
          }
          if (lead.selectedModules?.length) {
            setSelectedModules(lead.selectedModules);
            setFormData(prev => ({ ...prev, selectedModules: lead.selectedModules }));
          }
          // FIXED: Don't auto-advance to step 2 - let user choose
          // Only show a banner that they have saved progress
        }
      } catch (e) {
        console.error("Failed to load saved lead:", e);
      }
    }
  }, []);

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

  // Save lead to Slack via API - FIXED with better logging
  const saveLeadToSlack = async (leadData, status = "started") => {
    try {
      console.log("Sending to Slack API:", leadData);

      const response = await fetch("/api/leads/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadData,
          status,
          savedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      console.log("Slack API response:", result);

      if (!response.ok) {
        throw new Error(result.error || "Failed to save to Slack");
      }

      return result;
    } catch (error) {
      console.error("Failed to save lead to Slack:", error);
      setShowSlackError(true);
      setTimeout(() => setShowSlackError(false), 5000);
      return null;
    }
  };

  // Save lead locally and send to Slack - FIXED
  const handleSaveAndContinue = async () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      setErrors({
        name: !formData.name ? "Name required" : "",
        email: !formData.email ? "Email required" : "",
        phone: !formData.phone ? "Phone required" : "",
      });
      return;
    }

    setSavingLead(true);
    setShowSlackError(false);

    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      classType: formData.classType,
      pricingType: pricingType,
      selectedModules: pricingType === "individual" ? selectedModules : [],
      totalAmount: pricingType === "fullstack" ? 450000 : calculateTotal(selectedModules),
    };

    // Save to localStorage
    localStorage.setItem("deboik_lead", JSON.stringify({
      ...leadData,
      savedAt: new Date().toISOString(),
      completedPayment: false
    }));

    // Send to Slack
    const slackResult = await saveLeadToSlack(leadData, "form_completed");

    setSavingLead(false);

    if (slackResult?.success) {
      setLeadSaved(true);
      // Move to step 3 after saving
      setTimeout(() => {
        setStep(3);
      }, 1000);
    } else {
      // Still allow proceeding even if Slack fails
      setLeadSaved(true);
      setTimeout(() => {
        setStep(3);
      }, 1000);
    }
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

  // Step 3: Make Payment
  const handleMakePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          classType: formData.classType,
          pricingType: pricingType,
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

  const totalAmount = pricingType === "fullstack" ? 450000 : calculateTotal(selectedModules);

  return (
    <main className="min-h-screen bg-academy-dark">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Enroll in <span className="text-gradient">Deboik Academy</span>
            </h1>
            <p className="text-xl text-gray-400">Complete your registration in 3 simple steps</p>
          </div>

          {/* Slack Error Banner */}
          {showSlackError && (
            <div className="max-w-2xl mx-auto mb-6 bg-red-500/20 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="text-red-400 text-xl">⚠️</div>
                <div>
                  <p className="text-white font-semibold">Slack Notification Failed</p>
                  <p className="text-gray-400 text-sm">But we saved your progress. Continue to payment.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step indicators - 3 steps */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {[
                { n: 1, label: "Choose Plan" },
                { n: 2, label: "Your Info" },
                { n: 3, label: "Payment" },
              ].map(({ n, label }, idx) => (
                <div key={n} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= n
                          ? "bg-academy-yellow text-academy-dark"
                          : "bg-academy-primary/20 text-gray-400"
                        }`}
                    >
                      {step > n ? <IoCheckmarkCircle className="text-academy-dark" /> : n}
                    </div>
                    <span className={`text-sm hidden md:inline ${step >= n ? "text-white" : "text-gray-500"
                      }`}>
                      {label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div
                      className={`w-12 md:w-20 h-px mx-2 ${step > n ? "bg-academy-yellow" : "bg-academy-primary/20"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Step 1 — Choose Pricing Plan */}
            {step === 1 && (
              <div className="academy-card rounded-2xl p-8">
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
                  <div>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Complete Fullstack JS Course</h3>
                      <p className="text-gray-400">All modules included - Web, Mobile, Desktop, Backend</p>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-white">₦450,000</span>
                        <span className="text-gray-400 line-through ml-2">₦650,000</span>
                        <p className="text-academy-yellow text-sm mt-1">Early Bird Pricing</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
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
                      Continue to Your Info →
                    </button>
                  </div>
                )}

                {/* Individual Modules */}
                {pricingType === "individual" && (
                  <div className="space-y-6">
                    <p className="text-gray-400 text-center">
                      Select modules you want to learn
                    </p>

                    <div className="space-y-3">
                      {INDIVIDUAL_MODULES.map((module) => (
                        <label
                          key={module.id}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedModules.includes(module.id)
                              ? "border-academy-yellow bg-academy-yellow/10"
                              : "border-academy-primary/30 hover:border-academy-primary/60 bg-academy-dark"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{module.icon}</span>
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

                    {errors.modules && (
                      <p className="text-red-400 text-sm text-center">{errors.modules}</p>
                    )}

                    <div className="border-t border-academy-primary/20 pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400">Selected Modules:</span>
                        <span className="text-white font-semibold">{selectedModules.length}</span>
                      </div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold text-white">Total:</span>
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
                        Continue to Your Info →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2 — Your Information (Save to Slack) */}
            {step === 2 && (
              <div className="academy-card rounded-2xl p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Your Information</h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {pricingType === "fullstack"
                        ? "Fullstack Package - ₦450,000"
                        : `Individual Modules (${selectedModules.length}) - ₦${totalAmount.toLocaleString()}`}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <IoArrowBack size={24} />
                  </button>
                </div>

                {/* Slack Notice */}
                <div className="mb-6 p-4 bg-[#36C5F0]/10 rounded-xl border border-[#36C5F0]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#36C5F0]/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">💬</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Your info will be sent to our team via Slack</p>
                      <p className="text-gray-500 text-xs">We'll reach out within 24 hours if you need help</p>
                    </div>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full bg-academy-dark border ${errors.name ? "border-red-500" : "border-academy-primary/30"
                        } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-primary`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm font-medium">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`w-full bg-academy-dark border ${errors.email ? "border-red-500" : "border-academy-primary/30"
                        } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-primary`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className={`w-full bg-academy-dark border ${errors.phone ? "border-red-500" : "border-academy-primary/30"
                        } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-academy-primary`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Class Format *</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["online", "offline"].map((type) => (
                        <label
                          key={type}
                          className={`relative flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.classType === type
                              ? "border-academy-yellow bg-academy-yellow/10"
                              : "border-academy-primary/30 hover:border-academy-primary/60 bg-academy-dark"
                            }`}
                        >
                          <input
                            type="radio"
                            name="classType"
                            value={type}
                            disabled={type === 'offline'}
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
                            <p className={`text-sm font-semibold capitalize ${formData.classType === type ? "text-academy-yellow" : "text-white"
                              }`}>
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
                    type="button"
                    onClick={handleSaveAndContinue}
                    disabled={savingLead}
                    className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {savingLead ? (
                      "Sending to Slack..."
                    ) : leadSaved ? (
                      "✓ Saved! Redirecting..."
                    ) : (
                      <>
                        <IoSaveOutline />
                        Save & Continue to Payment
                      </>
                    )}
                  </button>
                </form>

                <p className="text-gray-500 text-xs text-center mt-4">
                  Your information will be saved and sent to our team. We'll contact you if needed.
                </p>
              </div>
            )}

            {/* Step 3 — Payment */}
            {step === 3 && (
              <div className="academy-card rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoCheckmarkCircle className="text-green-400 text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Ready to Enroll?</h2>
                  <p className="text-gray-400 mt-2">
                    {formData.name}, you're almost there!
                  </p>
                </div>

                {/* Order Summary */}
                <div className="bg-academy-deep/50 rounded-xl p-6 mb-6">
                  <h3 className="text-white font-bold mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone:</span>
                      <span className="text-white">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Class Format:</span>
                      <span className="text-white capitalize">{formData.classType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plan:</span>
                      <span className="text-white">
                        {pricingType === "fullstack" ? "Fullstack Package" : `${selectedModules.length} Module(s)`}
                      </span>
                    </div>
                    <div className="border-t border-academy-primary/20 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-white">Total:</span>
                        <span className="text-2xl font-bold text-academy-yellow">
                          ₦{totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleMakePayment}
                  disabled={loading}
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <IoLockClosed />
                  {loading ? "Initializing Payment..." : `Pay ₦${totalAmount.toLocaleString()} with Paystack`}
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-3 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  ← Back to edit information
                </button>

                <p className="text-gray-500 text-xs text-center mt-4">
                  Secure payment powered by Paystack. You can pay with card, bank transfer, or USSD.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
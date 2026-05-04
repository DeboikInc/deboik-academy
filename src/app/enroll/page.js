"use client";

import { useState, useEffect } from "react";
import { IoArrowBack, IoCheckmarkCircle, IoSaveOutline, IoTimeOutline, IoLockClosed, IoCalendarOutline, IoWalletOutline, IoCopy, IoCheckmark, IoCard, IoCloudUpload, IoQrCode } from "react-icons/io5";
import { sendGAEvent } from '@next/third-parties/google'
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

// Course start date - May 4th, 2026
const EARLY_BIRD_END_DATE = new Date(2026, 4, 2); // 2 days before start date

// Check if Early Bird pricing is still available
const isEarlyBirdAvailable = () => {
  const now = new Date();
  return now < EARLY_BIRD_END_DATE;
};

// Get Early Bird countdown
const getEarlyBirdCountdown = () => {
  const now = new Date();
  const diff = EARLY_BIRD_END_DATE - now;
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return { days, hours };
};

// Installment plans for Fullstack Package
const getInstallmentPlans = (earlyBirdActive) => ({
  full_payment: {
    name: "Pay in Full",
    discount: earlyBirdActive ? "Save ₦200,000" : "Standard pricing",
    total: earlyBirdActive ? 450000 : 650000,
    installments: [
      { amount: earlyBirdActive ? 450000 : 650000, due: "Immediately", description: "One-time payment" }
    ],
    recommended: true,
  },
  two_installments: {
    name: "2 Installments",
    discount: "No extra fee",
    total: earlyBirdActive ? 470000 : 670000,
    installments: [
      { amount: earlyBirdActive ? 235000 : 335000, due: "Immediately", description: "Starts your enrollment" },
      { amount: earlyBirdActive ? 235000 : 335000, due: "In 2 Months", description: "Before Module 3" }
    ],
    recommended: false,
  },
  three_installments: {
    name: "3+ Installments",
    discount: "Small convenience fee",
    total: earlyBirdActive ? 495000 : 695000,
    installments: [
      { amount: earlyBirdActive ? 165000 : 231667, due: "Immediately", description: "Starts your enrollment" },
      { amount: earlyBirdActive ? 165000 : 231667, due: "In 2 Months", description: "Before Module 3" },
      { amount: earlyBirdActive ? 165000 : 231667, due: "In 3 Months", description: "Before Module 5" }
    ],
    recommended: false,
  },
});

// Bank transfer details
const BANK_DETAILS = {
  accountName: "DEBOIK INTERNATIONAL LIMITED",
  accountNumber: "2007176466",
  bankName: "First City Monument Bank (FCMB)",
  bankCode: "FCMB",
  currency: "NGN",
};

export default function Enroll() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [savingLead, setSavingLead] = useState(false);
  const [pricingType, setPricingType] = useState("fullstack");
  const [selectedModules, setSelectedModules] = useState([]);
  const [leadSaved, setLeadSaved] = useState(false);
  const [showSlackError, setShowSlackError] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState("full_payment");
  const [showInstallmentDetails, setShowInstallmentDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [copiedField, setCopiedField] = useState(null);
  const [earlyBirdActive, setEarlyBirdActive] = useState(true);
  const [earlyBirdCountdown, setEarlyBirdCountdown] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    classType: "online",
    pricingType: "fullstack",
    selectedModules: [],
    totalAmount: 450000,
    paymentPlan: "full_payment",
  });
  const [errors, setErrors] = useState({});

  // Check Early Bird status on mount and every hour
  useEffect(() => {
    const checkEarlyBird = () => {
      const available = isEarlyBirdAvailable();
      setEarlyBirdActive(available);
      setEarlyBirdCountdown(getEarlyBirdCountdown());
    };

    checkEarlyBird();
    const interval = setInterval(checkEarlyBird, 3600000); // Check every hour

    return () => clearInterval(interval);
  }, []);

  // Update total amount when early bird status changes
  useEffect(() => {
    const plans = getInstallmentPlans(earlyBirdActive);
    setFormData(prev => ({
      ...prev,
      totalAmount: plans[selectedInstallment].total
    }));
  }, [earlyBirdActive, selectedInstallment]);

  // Load saved lead data from localStorage on mount
  useEffect(() => {
    const savedLead = localStorage.getItem("deboik_lead");
    if (savedLead) {
      try {
        const lead = JSON.parse(savedLead);
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
          if (lead.paymentPlan) {
            setSelectedInstallment(lead.paymentPlan);
            setFormData(prev => ({ ...prev, paymentPlan: lead.paymentPlan }));
          }
        }
      } catch (e) {
        console.error("Failed to load saved lead:", e);
      }
    }
  }, []);

  const installmentPlans = getInstallmentPlans(earlyBirdActive);

  // Calculate total price for individual modules
  const calculateTotal = (modules) => {
    return modules.reduce((total, moduleId) => {
      const module = INDIVIDUAL_MODULES.find(m => m.id === moduleId);
      return total + (module?.price || 0);
    }, 0);
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
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
      totalAmount: type === "fullstack" ? installmentPlans[selectedInstallment].total : calculateTotal(selectedModules)
    }));
  };

  const handleInstallmentChange = (planId) => {
    setSelectedInstallment(planId);
    setFormData(prev => ({
      ...prev,
      paymentPlan: planId,
      totalAmount: installmentPlans[planId].total
    }));
  };

  // Generate payment narration for bank transfer
  const generatePaymentNarration = () => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const namePrefix = formData.name ? formData.name.slice(0, 20).toUpperCase().replace(/\s/g, "_") : "STUDENT";

    if (pricingType === "fullstack") {
      return `DEBOIK_FS_${selectedInstallment.toUpperCase()}_${namePrefix}_${timestamp}`;
    } else {
      const moduleCodes = selectedModules.map(id => {
        const codes = { js: "JS", node: "NODE", react: "REACT", nextjs: "NEXT", reactnative: "RN", electron: "ELEC" };
        return codes[id];
      }).join("_");
      return `DEBOIK_IND_${moduleCodes}_${namePrefix}_${timestamp}`;
    }
  };

  // Save lead to Slack via API
  const saveLeadToSlack = async (leadData, status = "started") => {
    try {
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

  // Save lead locally and send to Slack
  const handleSaveAndContinue = async () => {
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
      totalAmount: pricingType === "fullstack" ? installmentPlans[selectedInstallment].total : calculateTotal(selectedModules),
      paymentPlan: pricingType === "fullstack" ? selectedInstallment : null,
      earlyBirdUsed: earlyBirdActive,
    };

    localStorage.setItem("deboik_lead", JSON.stringify({
      ...leadData,
      savedAt: new Date().toISOString(),
      completedPayment: false
    }));

    await saveLeadToSlack(leadData, "form_completed");

    setSavingLead(false);
    setLeadSaved(true);
    setTimeout(() => {
      setStep(3);
    }, 1000);
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

  // Handle payment based on selected method
  const handleMakePayment = async () => {
    if (paymentMethod === "paystack") {
      setLoading(true);
      sendGAEvent('event', 'button_clicked', { value: 'payment made' });
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
            totalAmount: pricingType === "fullstack" ? installmentPlans[selectedInstallment].total : calculateTotal(selectedModules),
            paymentPlan: pricingType === "fullstack" ? selectedInstallment : null,
            isInstallment: pricingType === "fullstack" && selectedInstallment !== "full_payment",
            firstInstallmentAmount: pricingType === "fullstack" && selectedInstallment !== "full_payment"
              ? installmentPlans[selectedInstallment].installments[0].amount
              : null,
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
    } else if (paymentMethod === "bank") {
      // For bank transfer, show confirmation and save enrollment
      const narration = generatePaymentNarration();
      alert(`Please complete your bank transfer using the details below.\n\nNarration: ${narration}\n\nWe will activate your enrollment upon confirmation.`);
      // Save pending enrollment to localStorage
      localStorage.setItem("deboik_pending_payment", JSON.stringify({
        ...formData,
        paymentMethod: "bank",
        narration,
        amount: pricingType === "fullstack" ? installmentPlans[selectedInstallment].total : calculateTotal(selectedModules),
        date: new Date().toISOString(),
      }));
    }
  };

  const totalAmount = pricingType === "fullstack"
    ? installmentPlans[selectedInstallment].total
    : calculateTotal(selectedModules);

  const firstInstallmentAmount = pricingType === "fullstack" && selectedInstallment !== "full_payment"
    ? installmentPlans[selectedInstallment].installments[0].amount
    : totalAmount;

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

          {/* Early Bird Countdown Banner */}
          {earlyBirdActive && earlyBirdCountdown && (
            <div className="max-w-2xl mx-auto mb-6 bg-academy-yellow/10 border border-academy-yellow/30 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-academy-yellow/20 rounded-full flex items-center justify-center">
                    <IoTimeOutline className="text-academy-yellow text-xl" />
                  </div>
                  <div>
                    <p className="text-academy-yellow font-semibold">Early Bird Pricing Ends Soon!</p>
                    <p className="text-gray-300 text-sm">
                      {earlyBirdCountdown.days} days {earlyBirdCountdown.hours} hours remaining
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">Save ₦200,000</p>
                  <p className="text-gray-400 text-xs">Regular price: ₦650,000</p>
                </div>
              </div>
            </div>
          )}

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

          {/* Step indicators */}
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
                  {['fullstack', 'individual'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handlePricingTypeChange(type)}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${pricingType === type
                        ? "bg-academy-yellow text-academy-dark"
                        : "text-gray-400 hover:text-white border border-academy-primary/80 hover:border-academy-primary/100"
                        }`}
                    >
                      {type === 'fullstack' && 'Fullstack Package'}
                      {type === 'individual' && 'Individual Modules'}
                    </button>
                  ))}
                </div>

                {/* Fullstack Package */}
                {pricingType === "fullstack" && (
                  <div>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Complete Fullstack JS Course</h3>
                      <p className="text-gray-400">All modules included - Web, Mobile, Desktop, Backend</p>
                    </div>

                    {/* Installment Plans */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-semibold flex items-center gap-2">
                          <IoWalletOutline className="text-academy-yellow" />
                          Payment Plan
                        </h4>
                        <button
                          onClick={() => setShowInstallmentDetails(!showInstallmentDetails)}
                          className="text-academy-yellow text-sm hover:underline"
                        >
                          {showInstallmentDetails ? "Hide details" : "View details"}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {Object.entries(installmentPlans).map(([planId, plan]) => (
                          <label
                            key={planId}
                            className={`relative cursor-pointer transition-all rounded-xl border-2 p-4 ${selectedInstallment === planId
                              ? "border-academy-yellow bg-academy-yellow/10"
                              : "border-academy-primary/30 hover:border-academy-primary/60 bg-academy-dark"
                              }`}
                          >
                            <input
                              type="radio"
                              name="installment"
                              value={planId}
                              checked={selectedInstallment === planId}
                              onChange={() => handleInstallmentChange(planId)}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <p className="text-white font-bold">{plan.name}</p>
                              <p className="text-academy-yellow text-xl font-bold mt-1">
                                ₦{plan.total.toLocaleString()}
                              </p>
                              <p className="text-green-400 text-xs mt-1">{plan.discount}</p>
                              {plan.recommended && (
                                <span className="inline-block mt-2 bg-academy-yellow text-academy-dark text-xs px-2 py-1 rounded-full">
                                  Recommended
                                </span>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>

                      {/* Installment Details */}
                      {showInstallmentDetails && (
                        <div className="mt-4 p-4 bg-academy-deep/50 rounded-xl">
                          <h5 className="text-white text-sm font-semibold mb-3">Payment Schedule:</h5>
                          <div className="space-y-2">
                            {installmentPlans[selectedInstallment].installments.map((inst, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                  <IoCalendarOutline className="text-academy-yellow" />
                                  <span className="text-gray-300">Installment {idx + 1}:</span>
                                  <span className="text-gray-400">{inst.due}</span>
                                </div>
                                <span className="text-white font-semibold">₦{inst.amount.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-gray-400 text-xs mt-3">
                            {selectedInstallment === "full_payment"
                              ? "Pay once and get full access immediately."
                              : "First payment secures your spot. Subsequent payments are due before specific modules."}
                          </p>
                        </div>
                      )}
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

            {/* Step 2 — Your Information */}
            {step === 2 && (
              <div className="academy-card rounded-2xl p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Your Information</h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {pricingType === "fullstack"
                        ? `Fullstack Package - ₦${totalAmount.toLocaleString()} (${installmentPlans[selectedInstallment].name})`
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

                <div className="mb-6 p-4 bg-[#36C5F0]/10 rounded-xl border border-[#36C5F0]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#36C5F0]/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">💬</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Your info will be sent to our team</p>
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
                            disabled={type === "offline"} // Disable offline option for now
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
                      "Saving..."
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
                  Your information will be saved. We'll contact you if needed.
                </p>
              </div>
            )}

            {/* Step 3 — Payment Options */}
            {step === 3 && (
              <div className="academy-card rounded-2xl p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Select Payment Method</h2>
                    {pricingType === "fullstack" && selectedInstallment === "three_installments" && (
                      <p className="text-gray-400 text-sm mt-1">
                        To pay lesser than <span className="text-academy-yellow font-bold">₦{firstInstallmentAmount.toLocaleString()}</span> use the second option below to pay via bank transfer. Otherwise, proceed with Paystack for instant access.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Back"
                  >
                    <IoArrowBack size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Option 1: Paystack */}
                  <div
                    className={`academy-card rounded-xl p-5 cursor-pointer transition-all border-2 ${paymentMethod === "paystack" ? "border-academy-yellow" : "border-transparent"}`}
                    onClick={() => setPaymentMethod("paystack")}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-academy-primary/20 rounded-xl flex items-center justify-center">
                          <IoCard className="text-academy-yellow text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">Pay with Paystack</h3>
                          <p className="text-gray-400 text-sm">Card, Bank Transfer, USSD, or Mobile Money</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "paystack" ? "border-academy-yellow bg-academy-yellow" : "border-gray-500"}`}>
                        {paymentMethod === "paystack" && <div className="w-full h-full rounded-full bg-academy-yellow" />}
                      </div>
                    </div>
                    {paymentMethod === "paystack" && (
                      <button
                        onClick={handleMakePayment}
                        disabled={loading}
                        className="btn-primary w-full disabled:opacity-50"
                      >
                        {loading ? "Processing..." : `Pay ₦${firstInstallmentAmount.toLocaleString()} with Paystack`}
                      </button>
                    )}
                  </div>

                  {/* Option 2: Direct Bank Transfer */}
                  <div
                    className={`academy-card rounded-xl p-5 cursor-pointer transition-all border-2 ${paymentMethod === "bank" ? "border-academy-yellow" : "border-transparent"}`}
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-academy-primary/20 rounded-xl flex items-center justify-center">
                          <IoCloudUpload className="text-academy-yellow text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">Direct Bank Transfer</h3>
                          <p className="text-gray-400 text-sm">Pay via transfer from your banking app</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "bank" ? "border-academy-yellow bg-academy-yellow" : "border-gray-500"}`}>
                        {paymentMethod === "bank" && <div className="w-full h-full rounded-full bg-academy-yellow" />}
                      </div>
                    </div>

                    {paymentMethod === "bank" && (
                      <div className="mt-4 p-4 bg-academy-deep/50 rounded-xl space-y-3">
                        <div className="flex justify-between items-center p-3 bg-academy-dark rounded-lg">
                          <div>
                            <p className="text-gray-400 text-xs">Account Name</p>
                            <p className="text-white font-medium">{BANK_DETAILS.accountName}</p>
                          </div>
                          <button
                            onClick={() => handleCopy(BANK_DETAILS.accountName, "accountName")}
                            className="text-academy-yellow hover:text-academy-yellow/80"
                          >
                            {copiedField === "accountName" ? <IoCheckmark /> : <IoCopy />}
                          </button>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-academy-dark rounded-lg">
                          <div>
                            <p className="text-gray-400 text-xs">Account Number</p>
                            <p className="text-white font-mono text-lg">{BANK_DETAILS.accountNumber}</p>
                          </div>
                          <button
                            onClick={() => handleCopy(BANK_DETAILS.accountNumber, "accountNumber")}
                            className="text-academy-yellow hover:text-academy-yellow/80"
                          >
                            {copiedField === "accountNumber" ? <IoCheckmark /> : <IoCopy />}
                          </button>
                        </div>
                        <div className="p-3 bg-academy-dark rounded-lg">
                          <p className="text-gray-400 text-xs">Bank Name</p>
                          <p className="text-white">{BANK_DETAILS.bankName}</p>
                        </div>
                        <div className="p-3 bg-academy-yellow/10 rounded-lg border border-academy-yellow/30">
                          <p className="text-gray-300 text-xs mb-2">Payment Narration (Copy this exactly)</p>
                          <div className="flex justify-between items-center">
                            <code className="text-academy-yellow text-xs font-mono break-all">{generatePaymentNarration()}</code>
                            <button
                              onClick={() => handleCopy(generatePaymentNarration(), "narration")}
                              className="text-academy-yellow hover:text-academy-yellow/80 ml-2 flex-shrink-0"
                            >
                              {copiedField === "narration" ? <IoCheckmark /> : <IoCopy />}
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs">
                          Amount to transfer: <strong className="text-academy-yellow">₦{firstInstallmentAmount.toLocaleString()}</strong> or lesser
                        </p>
                        <p className="text-gray-400 text-xs">
                          After payment, send proof to <strong className="text-academy-yellow">academy@deboik.com</strong> or WhatsApp <strong className="text-green-400"><a href="https://api.whatsapp.com/send/?phone=2349125273293&text=Hi%20there!&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">+234 912 527 3293</a></strong>
                        </p>
                        <button
                          onClick={() => {
                            alert(`Please transfer ₦${firstInstallmentAmount.toLocaleString()} to:\n\n${BANK_DETAILS.accountName}\n${BANK_DETAILS.accountNumber}\n${BANK_DETAILS.bankName}\n\nNarration: ${generatePaymentNarration()}\n\nWe will confirm and activate your enrollment.`);
                          }}
                          className="btn-secondary w-full mt-2"
                        >
                          I've Made the Transfer
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Option 3: Flutterwave QR (Optional - if you have the QR code) */}
                  {/* <div className="academy-card rounded-xl p-5 cursor-pointer transition-all border-2 border-transparent">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-academy-primary/20 rounded-xl flex items-center justify-center">
                        <IoQrCode className="text-academy-yellow text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Scan to Pay with Flutterwave</h3>
                        <p className="text-gray-400 text-sm">Scan QR code with your banking app</p>
                      </div>
                    </div>
                  </div> */}
                </div>

                <p className="text-gray-500 text-xs text-center mt-6">
                  Need help? Contact us at <strong className="text-academy-yellow">academy@deboik.com</strong>
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
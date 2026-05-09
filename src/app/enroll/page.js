"use client";

import { useState, useEffect } from "react";
import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoCalendarOutline,
  IoWalletOutline,
  IoCopy,
  IoCheckmark,
  IoCard,
  IoQrCode,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
} from "react-icons/io5";
import { sendGAEvent } from "@next/third-parties/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CohortBanner from "@/components/CohortBanner";
import { useCohort } from "@/hooks/useCohort";
//import PageTitle from "@/components/EnrollPage";

// ─── Constants ─────────────────────────────────────────────────────────────────

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
  { id: "js",          name: "JavaScript Fundamentals",        price: 250000, icon: "📘" },
  { id: "node",        name: "Node.js (Express.js)",           price: 350000, icon: "🚀" },
  { id: "react",       name: "React (Frontend)",               price: 350000, icon: "⚛️" },
  { id: "nextjs",      name: "Next.js (Fullstack Framework)",  price: 550000, icon: "▲"  },
  { id: "reactnative", name: "React Native (Mobile)",          price: 350000, icon: "📱" },
  { id: "electron",    name: "Electron (Desktop)",             price: 350000, icon: "💻" },
];

const BANK_DETAILS = {
  accountName:   "DEBOIK INTERNATIONAL LIMITED",
  accountNumber: "2007176466",
  bankName:      "First City Monument Bank (FCMB)",
};

// Minimum and maximum installments for the 3+ plan
const MIN_INSTALLMENTS = 3;
const MAX_INSTALLMENTS = 4;

/**
 * Generates installment plans.
 * @param {boolean} isEarlyBird
 * @param {number}  nPlusCount  – the chosen count for the "3+" plan (3–6)
 */
const getInstallmentPlans = (isEarlyBird, nPlusCount = 3) => {
  const base     = isEarlyBird ? 450000 : 650000;
  const twoTotal = base + 20000;
  // Convenience fee grows by ₦25,000 for each installment beyond 2
  const nPlusTotal = base + 20000 + 25000 * (nPlusCount - 2);

  // Distribute nPlusTotal as evenly as possible; last slice absorbs remainder
  const buildInstallments = (total, count) => {
    const even      = Math.floor(total / count);
    const remainder = total - even * count;
    const dueLabels = ["Immediately", "In 1 Month", "In 2 Months", "In 3 Months", "In 4 Months", "In 5 Months"];
    const descLabels = [
      "Starts your enrollment",
      "Before Module 2",
      "Before Module 3",
      "Before Module 4",
      "Before Module 5",
      "Before Module 6",
    ];
    return Array.from({ length: count }, (_, i) => ({
      amount:      i === count - 1 ? even + remainder : even,
      due:         dueLabels[i]  ?? `In ${i} Months`,
      description: descLabels[i] ?? `Before Module ${i + 1}`,
    }));
  };

  return {
    full_payment: {
      name: "Pay in Full",
      badge: "RECOMMENDED",
      savings: isEarlyBird ? "Save ₦200,000" : "Standard pricing",
      total: base,
      installments: [{ amount: base, due: "Immediately", description: "One-time payment" }],
      recommended: true,
    },
    two_installments: {
      name: "2 Installments",
      badge: null,
      savings: "No extra fee",
      total: twoTotal,
      installments: buildInstallments(twoTotal, 2),
      recommended: false,
    },
    three_plus_installments: {
      name: `${nPlusCount} Installments`,
      badge: null,
      savings: "Small convenience fee",
      total: nPlusTotal,
      installments: buildInstallments(nPlusTotal, nPlusCount),
      recommended: false,
    },
  };
};

const fmt = (n) => `₦${Number(n).toLocaleString()}`;

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Enroll() {
  const { cohort, isEarlyBird } = useCohort();

  const [step,                setStep]                = useState(1);
  const [loading,             setLoading]             = useState(false);
  const [savingLead,          setSavingLead]          = useState(false);
  const [leadSaved,           setLeadSaved]           = useState(false);
  const [showSlackError,      setShowSlackError]      = useState(false);
  const [pricingType,         setPricingType]         = useState("fullstack");
  const [selectedModules,     setSelectedModules]     = useState([]);
  const [selectedInstallment, setSelectedInstallment] = useState("full_payment");
  // 3+ installments: chosen count (3–6)
  const [installmentCount,    setInstallmentCount]    = useState(MIN_INSTALLMENTS);
  const [showPaySchedule,     setShowPaySchedule]     = useState(false);
  const [paymentMethod,       setPaymentMethod]       = useState("paystack");
  const [copiedField,         setCopiedField]         = useState(null);
  const [bankTransferDone,    setBankTransferDone]    = useState(false);
  const [errors,              setErrors]              = useState({});
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", classType: "online" });

  
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("step") === "2") setStep(2);
}, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("deboik_lead");
      if (!raw) return;
      const lead = JSON.parse(raw);
      if ((Date.now() - new Date(lead.savedAt)) / 86_400_000 >= 7) return;
      if (lead.name)                       setFormData(p => ({ ...p, name:      lead.name }));
      if (lead.email)                      setFormData(p => ({ ...p, email:     lead.email }));
      if (lead.phone)                      setFormData(p => ({ ...p, phone:     lead.phone }));
      if (lead.classType)                  setFormData(p => ({ ...p, classType: lead.classType }));
      if (lead.pricingType)                setPricingType(lead.pricingType);
      if (lead.selectedModules?.length)    setSelectedModules(lead.selectedModules);
      if (lead.paymentPlan) {
        // migrate old key name → new key name
        const migratedPlan = lead.paymentPlan === "three_installments"
          ? "three_plus_installments"
          : lead.paymentPlan;
        setSelectedInstallment(migratedPlan);
      }
      if (lead.installmentCount)           setInstallmentCount(lead.installmentCount);
    } catch { /* ignore */ }
  }, []);

  const plans = getInstallmentPlans(isEarlyBird, installmentCount);

  const moduleTotal = selectedModules.reduce((sum, id) => {
    const m = INDIVIDUAL_MODULES.find(m => m.id === id);
    return sum + (m?.price || 0);
  }, 0);

  // Guard: if a stale/unknown key slips through, fall back to full_payment
  const safePlan = plans[selectedInstallment] ?? plans["full_payment"];
  const totalAmount            = pricingType === "fullstack" ? safePlan.total : moduleTotal;
  const isInstallment          = pricingType === "fullstack" && selectedInstallment !== "full_payment";
  const firstInstallmentAmount = isInstallment ? safePlan.installments[0].amount : totalAmount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const handleModuleToggle = (id) =>
    setSelectedModules(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const generateNarration = () => {
    const ts   = new Date().toISOString().slice(0, 10);
    const name = (formData.name || "STUDENT").slice(0, 15).toUpperCase().replace(/\s/g, "_");
    return pricingType === "fullstack"
      ? `DEBOIK_FS_${selectedInstallment.toUpperCase()}_${name}_${ts}`
      : `DEBOIK_IND_${name}_${ts}`;
  };

  const validateInfo = () => {
    const e = {};
    if (!formData.name.trim())  e.name  = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email format";
    if (!formData.phone.trim()) e.phone = "Phone is required";
    else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ""))) e.phone = "Enter a valid phone number";
    if (pricingType === "individual" && selectedModules.length === 0) e.modules = "Please select at least one module";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveLeadToSlack = async (leadData, status) => {
    try {
      const res = await fetch("/api/leads/save", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadData, status, savedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setShowSlackError(true);
      setTimeout(() => setShowSlackError(false), 5000);
    }
  };

  const handleSaveAndContinue = async () => {
    if (!validateInfo()) return;
    setSavingLead(true);
    const leadData = {
      ...formData, pricingType,
      selectedModules: pricingType === "individual" ? selectedModules : [],
      totalAmount,
      paymentPlan:      pricingType === "fullstack" ? selectedInstallment : null,
      installmentCount: selectedInstallment === "three_plus_installments" ? installmentCount : null,
      earlyBirdUsed:    isEarlyBird,
    };
    localStorage.setItem("deboik_lead", JSON.stringify({ ...leadData, savedAt: new Date().toISOString() }));
    await saveLeadToSlack(leadData, "form_completed");
    setSavingLead(false);
    setLeadSaved(true);
    setTimeout(() => setStep(3), 800);
  };

  const handleMakePayment = async () => {
    if (paymentMethod === "paystack") {
      setLoading(true);
      sendGAEvent("event", "button_clicked", { value: "payment_made" });
      try {
        const res = await fetch("/api/payment/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            pricingType,
            selectedModules:  pricingType === "individual" ? selectedModules : [],
            paymentPlan:      pricingType === "fullstack" ? selectedInstallment : null,
            installmentCount: selectedInstallment === "three_plus_installments" ? installmentCount : null,
            totalAmount,
            isInstallment,
            firstInstallmentAmount,
            earlyBirdUsed: isEarlyBird,
            cohortId:      cohort?.id ?? null,
          }),
        });
        const data = await res.json();
        if (data.authorizationUrl) window.location.href = data.authorizationUrl;
        else alert("Failed to initialise payment. Please try again.");
      } catch {
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      const narration = generateNarration();
      localStorage.setItem("deboik_pending_payment", JSON.stringify({
        ...formData, pricingType, paymentMethod, narration,
        amount: totalAmount, date: new Date().toISOString(),
      }));
      await saveLeadToSlack(
        {
          ...formData, pricingType, totalAmount,
          paymentPlan:      selectedInstallment,
          installmentCount: selectedInstallment === "three_plus_installments" ? installmentCount : null,
          paymentMethod:    "bank", narration,
          earlyBirdUsed:    isEarlyBird,
          cohortId:         cohort?.id ?? null,
        },
        "bank_transfer_initiated"
      );
      setBankTransferDone(true);
    }
  };

  // ── Step 1 ──────────────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="academy-card rounded-2xl p-8">
      <CohortBanner variant="full" className="mb-8" />

      <h2 className="text-2xl font-bold text-white mb-2">Choose Your Plan</h2>
      <p className="text-gray-400 text-sm mb-6">Select a package and payment structure that works for you.</p>

      {/* Plan type toggle */}
      <div className="flex gap-3 mb-8 bg-academy-deep/40 p-1.5 rounded-xl">
        {[["fullstack", "Fullstack Package"], ["individual", "Individual Modules"]].map(([val, label]) => (
          <button key={val}
            onClick={() => { setPricingType(val); if (val === "individual") setSelectedModules([]); }}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
              pricingType === val ? "bg-academy-yellow text-academy-dark shadow-md" : "text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Fullstack payment plans */}
      {pricingType === "fullstack" && (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <IoWalletOutline className="text-academy-yellow" /> Payment Plan
              </h3>
              <button onClick={() => setShowPaySchedule(s => !s)} className="text-academy-yellow text-xs hover:underline">
                {showPaySchedule ? "Hide schedule" : "View schedule"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(plans).map(([id, plan]) => (
                <button key={id} onClick={() => setSelectedInstallment(id)}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all ${
                    selectedInstallment === id
                      ? "border-academy-yellow bg-academy-yellow/10"
                      : "border-academy-primary/30 hover:border-academy-primary/60 bg-academy-dark"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2.5 left-3 bg-academy-yellow text-academy-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                  <p className="text-white font-bold text-sm mb-1">
                    {id === "three_plus_installments" ? `${installmentCount}+ Installments` : plan.name}
                  </p>
                  <p className="text-academy-yellow text-xl font-bold">{fmt(plan.total)}</p>
                  <p className="text-green-400 text-xs mt-1">{plan.savings}</p>
                  {isInstallment && selectedInstallment === id && (
                    <p className="text-gray-400 text-xs mt-2">Pay {fmt(plan.installments[0].amount)} now</p>
                  )}
                </button>
              ))}
            </div>

            {/* ── 3+ Installments: count selector ─────────────────────────── */}
            {selectedInstallment === "three_plus_installments" && (
              <div className="mt-3 p-4 bg-academy-deep/60 border border-academy-yellow/20 rounded-xl">
                <p className="text-gray-300 text-sm font-medium mb-3">
                  How many installments?
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setInstallmentCount(c => Math.max(MIN_INSTALLMENTS, c - 1))}
                    disabled={installmentCount <= MIN_INSTALLMENTS}
                    className="text-academy-yellow disabled:opacity-30 transition-opacity hover:scale-110"
                  >
                    <IoRemoveCircleOutline size={28} />
                  </button>

                  <div className="flex gap-2 flex-1 justify-center">
                    {Array.from({ length: MAX_INSTALLMENTS - MIN_INSTALLMENTS + 1 }, (_, i) => {
                      const n = MIN_INSTALLMENTS + i;
                      return (
                        <button
                          key={n}
                          onClick={() => setInstallmentCount(n)}
                          className={`w-10 h-10 rounded-lg text-sm font-bold border-2 transition-all ${
                            installmentCount === n
                              ? "border-academy-yellow bg-academy-yellow text-academy-dark"
                              : "border-academy-primary/30 text-gray-400 hover:border-academy-primary/60 hover:text-white"
                          }`}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setInstallmentCount(c => Math.min(MAX_INSTALLMENTS, c + 1))}
                    disabled={installmentCount >= MAX_INSTALLMENTS}
                    className="text-academy-yellow disabled:opacity-30 transition-opacity hover:scale-110"
                  >
                    <IoAddCircleOutline size={28} />
                  </button>
                </div>

                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <span>{installmentCount} payments of ~{fmt(Math.floor(plans.three_plus_installments.total / installmentCount))}</span>
                  <span>Total: {fmt(plans.three_plus_installments.total)}</span>
                </div>
              </div>
            )}

            {showPaySchedule && (
              <div className="mt-4 p-4 bg-academy-deep/50 border border-academy-primary/20 rounded-xl">
                <h5 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                  <IoCalendarOutline className="text-academy-yellow" /> Payment Schedule
                </h5>
                <div className="space-y-3">
                  {plans[selectedInstallment].installments.map((inst, i) => (
                    <div key={i} className="flex justify-between items-start text-sm">
                      <div>
                        <p className="text-gray-200 font-medium">Installment {i + 1}</p>
                        <p className="text-gray-500 text-xs">{inst.due} · {inst.description}</p>
                      </div>
                      <span className="text-white font-bold">{fmt(inst.amount)}</span>
                    </div>
                  ))}
                </div>
                {selectedInstallment !== "full_payment" && (
                  <div className="mt-3 pt-3 border-t border-academy-primary/20 flex justify-between text-sm">
                    <span className="text-gray-400">Total</span>
                    <span className="text-academy-yellow font-bold">{fmt(plans[selectedInstallment].total)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 p-4 bg-academy-deep/30 rounded-xl">
            {FULLSTACK_FEATURES.map(f => (
              <div key={f} className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-academy-yellow flex-shrink-0 text-sm" />
                <span className="text-gray-300 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Individual modules */}
      {pricingType === "individual" && (
        <div className="mb-8 space-y-3">
          <p className="text-gray-400 text-sm mb-4">Select one or more modules to enroll in.</p>
          {INDIVIDUAL_MODULES.map(mod => (
            <label key={mod.id}
              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedModules.includes(mod.id)
                  ? "border-academy-yellow bg-academy-yellow/10"
                  : "border-academy-primary/30 hover:border-academy-primary/60 bg-academy-dark"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{mod.icon}</span>
                <div>
                  <p className="text-white font-medium text-sm">{mod.name}</p>
                  <p className="text-academy-yellow text-sm font-semibold">{fmt(mod.price)}</p>
                </div>
              </div>
              <input type="checkbox" checked={selectedModules.includes(mod.id)}
                onChange={() => handleModuleToggle(mod.id)} className="w-5 h-5 accent-yellow-400" />
            </label>
          ))}
          {errors.modules && <p className="text-red-400 text-sm">{errors.modules}</p>}
          <div className="pt-4 border-t border-academy-primary/20 flex justify-between items-center">
            <p className="text-gray-400 text-sm">{selectedModules.length} module{selectedModules.length !== 1 ? "s" : ""} selected</p>
            <span className="text-2xl font-bold text-academy-yellow">{fmt(moduleTotal)}</span>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          if (pricingType === "individual" && selectedModules.length === 0) {
            setErrors({ modules: "Please select at least one module" });
          } else {
            setStep(2);
          }
        }}
        className="btn-primary w-full text-lg py-4 rounded-xl font-bold"
      >
        Continue to Your Info →
      </button>
    </div>
  );

  // ── Step 2 ──────────────────────────────────────────────────────────────────
  const renderStep2 = () => (
    <div className="academy-card rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Information</h2>
          <p className="text-gray-400 text-sm mt-1">
            {pricingType === "fullstack"
              ? `${plans[selectedInstallment].name} · ${fmt(totalAmount)}`
              : `${selectedModules.length} module${selectedModules.length !== 1 ? "s" : ""} · ${fmt(moduleTotal)}`}
          </p>
        </div>
        <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white transition-colors">
          <IoArrowBack size={24} />
        </button>
      </div>

      <div className="space-y-5">
        {[
          { label: "Full Name *",     name: "name",  type: "text",  placeholder: "Enter your full name" },
          { label: "Email Address *", name: "email", type: "email", placeholder: "you@example.com"      },
          { label: "Phone Number *",  name: "phone", type: "tel",   placeholder: "+234 800 000 0000"    },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-gray-300 mb-1.5 text-sm font-medium">{label}</label>
            <input type={type} name={name} value={formData[name]} onChange={handleInputChange}
              placeholder={placeholder}
              className={`w-full bg-academy-dark border ${errors[name] ? "border-red-500" : "border-academy-primary/30"} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-academy-yellow/60 transition-colors`}
            />
            {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
          </div>
        ))}

        {/* ── Class Preference ──────────────────────────────────────────────── */}
        <div>
          <label className="block text-gray-300 mb-1.5 text-sm font-medium">Class Preference</label>
          <div className="flex gap-3">
            {/* Online */}
            <button
              onClick={() => setFormData(p => ({ ...p, classType: "online" }))}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                formData.classType === "online"
                  ? "border-academy-yellow bg-academy-yellow/10 text-white"
                  : "border-academy-primary/30 text-gray-400 hover:text-white"
              }`}
            >
              <span className="block font-semibold">Online</span>
              <span className="block text-xs font-normal mt-0.5 text-gray-400">Live Zoom sessions</span>
            </button>

            {/* Onsite — disabled */}
            <button
              disabled
              className="flex-1 py-2.5 px-3 rounded-lg text-sm font-medium border-2 border-academy-primary/20 text-gray-600"
            >
              <span className="block font-semibold">offline</span>
              <span className="block text-xs font-normal mt-0.5">In-person at our facility</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <div className="mt-8 p-4 bg-academy-deep/50 border border-academy-primary/20 rounded-xl">
        <h4 className="text-white text-sm font-semibold mb-3">Order Summary</h4>
        {pricingType === "fullstack" ? (
          <>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Package</span>
              <span className="text-white">Fullstack JS Course</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Payment Plan</span>
              <span className="text-white">
                {selectedInstallment === "three_plus_installments"
                  ? `${installmentCount} Installments`
                  : plans[selectedInstallment].name}
              </span>
            </div>
            {isInstallment && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Due Today</span>
                <span className="text-academy-yellow font-bold">{fmt(firstInstallmentAmount)}</span>
              </div>
            )}
          </>
        ) : (
          selectedModules.map(id => {
            const mod = INDIVIDUAL_MODULES.find(m => m.id === id);
            return (
              <div key={id} className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{mod.name}</span>
                <span className="text-white">{fmt(mod.price)}</span>
              </div>
            );
          })
        )}
        <div className="pt-3 mt-3 border-t border-academy-primary/20 flex justify-between">
          <span className="text-white font-bold">Total</span>
          <span className="text-academy-yellow font-bold text-lg">{fmt(totalAmount)}</span>
        </div>
      </div>

      <button onClick={handleSaveAndContinue} disabled={savingLead || leadSaved}
        className="btn-primary w-full mt-6 text-lg py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {savingLead ? (
          <><span className="w-4 h-4 border-2 border-academy-dark/40 border-t-academy-dark rounded-full animate-spin" /> Saving…</>
        ) : leadSaved ? (
          <><IoCheckmarkCircle className="text-academy-dark" /> Saved! Redirecting…</>
        ) : "Continue to Payment →"}
      </button>
    </div>
  );

  // ── Step 3 ──────────────────────────────────────────────────────────────────
  const renderStep3 = () => {
    const narration = generateNarration();
    return (
      <div className="academy-card rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
            <p className="text-gray-400 text-sm mt-1">
              {isInstallment
                ? `Pay ${fmt(firstInstallmentAmount)} now to secure your spot`
                : `Pay ${fmt(totalAmount)} to complete enrollment`}
            </p>
          </div>
          <button onClick={() => setStep(2)} className="text-gray-400 hover:text-white transition-colors">
            <IoArrowBack size={24} />
          </button>
        </div>

        {isInstallment && (
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
            <div className="flex items-start gap-3">
              <IoCalendarOutline className="text-blue-400 text-lg flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold mb-1">
                  {selectedInstallment === "three_plus_installments"
                    ? `${installmentCount} Installments Schedule`
                    : `${plans[selectedInstallment].name} Schedule`}
                </p>
                <div className="space-y-1">
                  {plans[selectedInstallment].installments.map((inst, i) => (
                    <p key={i} className="text-gray-400">
                      Installment {i + 1}: <span className="text-white font-medium">{fmt(inst.amount)}</span> · {inst.due} · {inst.description}
                    </p>
                  ))}
                </div>
                <p className="text-blue-400 mt-2 text-xs">Only {fmt(firstInstallmentAmount)} is charged today.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-300 text-sm font-medium mb-3">Select Payment Method</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "paystack", icon: <IoCard className="text-academy-yellow text-2xl mb-2" />,  title: "Card / USSD",    sub: "Instant · via Paystack"       },
              { id: "bank",     icon: <IoQrCode className="text-academy-yellow text-2xl mb-2" />, title: "Bank Transfer", sub: "Manual · 1–24 hrs to confirm" },
            ].map(({ id, icon, title, sub }) => (
              <button key={id} onClick={() => setPaymentMethod(id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  paymentMethod === id ? "border-academy-yellow bg-academy-yellow/10" : "border-academy-primary/30 hover:border-academy-primary/60"
                }`}
              >
                {icon}
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-gray-500 text-xs">{sub}</p>
              </button>
            ))}
          </div>
        </div>

        {paymentMethod === "bank" && !bankTransferDone && (
          <div className="mb-6 p-5 bg-academy-deep/60 border border-academy-primary/20 rounded-xl space-y-3">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <span className="w-6 h-6 bg-academy-yellow/20 rounded-full flex items-center justify-center text-academy-yellow text-xs">1</span>
              Transfer Details
            </h4>
            {[
              { label: "Account Name",   value: BANK_DETAILS.accountName,   field: "name"      },
              { label: "Account Number", value: BANK_DETAILS.accountNumber, field: "number"    },
              { label: "Bank",           value: BANK_DETAILS.bankName,      field: "bank"      },
              { label: "Amount",         value: isInstallment ? fmt(firstInstallmentAmount) : fmt(totalAmount), field: "amount" },
              { label: "Narration",      value: narration,                  field: "narration" },
            ].map(({ label, value, field }) => (
              <div key={field} className="flex items-center justify-between p-3 bg-academy-dark/60 rounded-lg">
                <div>
                  <p className="text-gray-500 text-xs">{label}</p>
                  <p className="text-white font-medium text-sm break-all">{value}</p>
                </div>
                <button onClick={() => handleCopy(value, field)}
                  className="ml-3 flex-shrink-0 p-2 text-gray-400 hover:text-academy-yellow transition-colors"
                >
                  {copiedField === field ? <IoCheckmark className="text-green-400" /> : <IoCopy />}
                </button>
              </div>
            ))}

            <p className="text-xs text-gray-500 flex items-start gap-2 pt-1">
              <span>ℹ️</span> Use the narration exactly as shown. Enrollment activates within 24 hours of confirmation.
            </p>

            {/* ── Proof-of-payment note ──────────────────────────────────────── */}
            <div className="mt-1 p-3 bg-academy-yellow/5 border border-academy-yellow/20 rounded-lg flex items-start gap-2">
              <span className="text-lg flex-shrink-0">📩</span>
              <p className="text-sm text-gray-300 leading-relaxed">
                After payment, send proof to{" "}
                <a
                  href="mailto:academy@deboik.com"
                  className="text-academy-yellow hover:underline font-medium"
                >
                  academy@deboik.com
                </a>{" "}
                or WhatsApp{" "}
                <a
                  href="https://api.whatsapp.com/send/?phone=2349125273293&text=Hi%20there!&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-academy-yellow hover:underline font-medium"
                >
                  +234 912 527 3293
                </a>
              </p>
            </div>
          </div>
        )}

        {paymentMethod === "bank" && bankTransferDone && (
          <div className="mb-6 p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
            <IoCheckmarkCircle className="text-green-400 text-5xl mx-auto mb-3" />
            <h4 className="text-white font-bold text-lg mb-1">Transfer Recorded!</h4>
            <p className="text-gray-400 text-sm">We'll activate your enrollment once your transfer is confirmed and send you a welcome email.</p>
            <p className="text-gray-600 text-xs mt-3 font-mono">{narration}</p>
          </div>
        )}

        <div className="mb-6 p-4 bg-academy-deep/40 border border-academy-primary/20 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-xs">
              {pricingType === "fullstack"
                ? selectedInstallment === "three_plus_installments"
                  ? `${installmentCount} Installments`
                  : plans[selectedInstallment].name
                : `${selectedModules.length} module(s)`}
            </p>
            <p className="text-gray-300 text-sm">{formData.name || "Student"}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs">{isInstallment ? "Due today" : "Total"}</p>
            <p className="text-academy-yellow font-bold text-xl">{fmt(isInstallment ? firstInstallmentAmount : totalAmount)}</p>
          </div>
        </div>

        {!bankTransferDone && (
          <button onClick={handleMakePayment} disabled={loading}
            className="btn-primary w-full text-lg py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-academy-dark/40 border-t-academy-dark rounded-full animate-spin" /> Processing…</>
            ) : paymentMethod === "paystack" ? (
              `Pay ${fmt(isInstallment ? firstInstallmentAmount : totalAmount)} via Paystack →`
            ) : (
              "I've Made the Transfer →"
            )}
          </button>
        )}

        <p className="text-center text-gray-600 text-xs mt-4">🔒 Payments are secure. Your data is never shared.</p>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-academy-dark">
      <title>Enroll | Deboik Academy</title>
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Enroll in <span className="text-gradient">Deboik Academy</span>
            </h1>
            <p className="text-xl text-gray-400">Complete your registration in 3 simple steps</p>
          </div>

          {showSlackError && (
            <div className="max-w-2xl mx-auto mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="text-white font-semibold">Notification failed — no worries</p>
                  <p className="text-gray-400 text-sm">Your progress is saved. Continue to payment.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step progress */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {[{ n: 1, label: "Choose Plan" }, { n: 2, label: "Your Info" }, { n: 3, label: "Payment" }].map(({ n, label }, idx) => (
                <div key={n} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      step >= n ? "bg-academy-yellow text-academy-dark" : "bg-academy-primary/20 text-gray-400"
                    }`}>
                      {step > n ? <IoCheckmarkCircle className="text-academy-dark" /> : n}
                    </div>
                    <span className={`text-sm hidden md:inline ${step >= n ? "text-white" : "text-gray-500"}`}>{label}</span>
                  </div>
                  {idx < 2 && <div className={`w-12 md:w-20 h-px mx-2 ${step > n ? "bg-academy-yellow" : "bg-academy-primary/20"}`} />}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
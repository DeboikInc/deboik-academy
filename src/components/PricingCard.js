"use client";

import { useState, useEffect } from "react";
import { IoCheckmarkCircle, IoTimeOutline } from "react-icons/io5";
import { useCohort, fmtDate } from "@/hooks/useCohort";

const fmt = (n) => "₦" + Number(n).toLocaleString("en-NG");

const getCountdown = (deadlineISO) => {
  const diff = new Date(deadlineISO) - new Date();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

export default function PricingCard({
  originalPrice,
  discountPrice,
  features = [],
  onContinue,
  showCountdown = true,
}) {
  const { cohort, loading } = useCohort();
  const [countdown, setCountdown] = useState(null);

  const isEarlyBirdActive = Boolean(cohort && countdown);
  const currentPrice = isEarlyBirdActive ? discountPrice : originalPrice;
  const savings = originalPrice - discountPrice;
  const savingsPct = Math.round((savings / originalPrice) * 100);

  useEffect(() => {
    if (!cohort?.enrollmentDeadline) return;
    setCountdown(getCountdown(cohort.enrollmentDeadline));
    const id = setInterval(() => setCountdown(getCountdown(cohort.enrollmentDeadline)), 1000);
    return () => clearInterval(id);
  }, [cohort?.enrollmentDeadline]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-academy-primary/30 bg-academy-deep/60 backdrop-blur-sm">
      {/* Badge */}
      {!loading && isEarlyBirdActive && (
        <div className="absolute top-4 right-4 bg-academy-yellow text-academy-dark text-xs font-bold px-3 py-1 rounded-full z-10">
          SAVE {savingsPct}%
        </div>
      )}
      {!loading && !isEarlyBirdActive && (
        <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          STANDARD PRICING
        </div>
      )}

      <div className="p-8">
        {/* Countdown — only when cohort is active and deadline is future */}
        {showCountdown && !loading && isEarlyBirdActive && countdown && (
          <div className="mb-6 p-3 bg-academy-yellow/10 border border-academy-yellow/30 rounded-xl">
            <div className="flex items-center gap-2 justify-center mb-2">
              <IoTimeOutline className="text-academy-yellow" />
              <span className="text-academy-yellow text-sm font-semibold">Early Bird Ends In:</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              {countdown.days > 0 && (
                <div className="text-center">
                  <div className="bg-academy-dark rounded-lg px-3 py-1 min-w-[50px]">
                    <span className="text-white font-bold text-xl">{countdown.days}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Days</p>
                </div>
              )}
              {[["hours", "Hours"], ["minutes", "Mins"], ["seconds", "Secs"]].map(([key, label]) => (
                <div key={key} className="text-center">
                  <div className="bg-academy-dark rounded-lg px-3 py-1 min-w-[50px]">
                    <span className="text-white font-bold text-xl">{countdown[key]}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price block */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-1">Complete Course</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-white">{fmt(currentPrice)}</span>
            {isEarlyBirdActive && (
              <span className="text-gray-500 line-through text-lg mb-1">{fmt(originalPrice)}</span>
            )}
          </div>
          {isEarlyBirdActive ? (
            <p className="text-academy-yellow text-sm mt-2 font-medium">
              Early Bird · Save {fmt(savings)}
            </p>
          ) : (
            <p className="text-gray-400 text-sm mt-2">
              Standard pricing{cohort ? ` · Course starts ${fmtDate(cohort.startDate)}` : ""}
            </p>
          )}
        </div>

        {/* Deadline info */}
        {!loading && isEarlyBirdActive && cohort && (
          <div className="mb-4 p-2 bg-academy-primary/10 rounded-lg">
            <p className="text-gray-400 text-xs text-center">
              ⏰ Early Bird ends: {fmtDate(cohort.enrollmentDeadline)} at 11:59 PM
            </p>
            <p className="text-gray-500 text-xs text-center mt-1">
              Course starts: {fmtDate(cohort.startDate)}
            </p>
          </div>
        )}

        <div className="border-t border-academy-primary/20 mb-6" />

        <ul className="space-y-3 mb-8">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
              <IoCheckmarkCircle className="text-academy-yellow flex-shrink-0 text-base" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <button onClick={onContinue} className="btn-primary w-full text-base py-3">
          Enroll Now — {fmt(currentPrice)}
        </button>

        <p className="text-center text-gray-500 text-xs mt-4">
          Secure payment{cohort ? ` · Starts ${fmtDate(cohort.startDate)}` : ""}
        </p>
      </div>
    </div>
  );
}
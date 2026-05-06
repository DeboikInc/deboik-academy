"use client";

import { useState, useEffect } from "react";
import { IoTimeOutline, IoRocketOutline } from "react-icons/io5";
import { useCohort, fmtDate } from "@/hooks/useCohort";

const SAVINGS = "₦200,000";

const getCountdown = (deadlineISO) => {
  const diff = new Date(deadlineISO) - new Date();
  if (diff <= 0) return null;
  return {
    days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  };
};

export default function CohortBanner({ variant = "full", className = "" }) {
  const { cohort, loading } = useCohort();
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!cohort?.enrollmentDeadline) return;
    setCountdown(getCountdown(cohort.enrollmentDeadline));
    const id = setInterval(
      () => setCountdown(getCountdown(cohort.enrollmentDeadline)),
      60_000
    );
    return () => clearInterval(id);
  }, [cohort?.enrollmentDeadline]);

  // Don't render while loading, if no active cohort, or deadline passed
  if (loading || !cohort || !countdown) return null;

  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-between gap-4 bg-academy-yellow/10 border border-academy-yellow/25 rounded-xl px-4 py-3 ${className}`}>
        <div className="flex items-center gap-2 min-w-0">
          <IoTimeOutline className="text-academy-yellow flex-shrink-0" />
          <span className="text-academy-yellow text-sm font-semibold truncate capitalize">
            {cohort.name} · Early Bird ends · Save {SAVINGS}
          </span>
        </div>
        <div className="flex-shrink-0 text-right">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Closes In
          </span>
          <span className="text-base font-black text-white tabular-nums">
            {countdown.days}d&nbsp;:&nbsp;{countdown.hours}h
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-academy-yellow/30 bg-academy-yellow/10 p-5 ${className}`}>
      <span className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-academy-yellow/10 animate-ping opacity-40 pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-academy-yellow/20 flex items-center justify-center">
            <IoRocketOutline className="text-academy-yellow text-xl" />
          </div>
          <div>
            <p className="text-academy-yellow font-bold leading-tight capitalize">
              🎉 {cohort.name} · Early Bird Pricing
            </p>
            <p className="text-gray-300 text-sm mt-0.5">
              Course starts{" "}
              <span className="text-white font-semibold">
                {fmtDate(cohort.startDate)}
              </span>
              . Lock in {SAVINGS} savings before the deadline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
          <div className="text-right">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Offer closes in
            </span>
            <span className="text-2xl font-black text-white tabular-nums leading-none">
              {countdown.days}d&nbsp;:&nbsp;{countdown.hours}h
            </span>
          </div>
          <div className="bg-academy-yellow text-academy-dark text-xs font-black px-3 py-1 rounded-full whitespace-nowrap">
            Save {SAVINGS}
          </div>
        </div>
      </div>
    </div>
  );
}
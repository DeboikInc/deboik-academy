"use client";

import { IoCheckmarkCircle } from "react-icons/io5";

export default function PricingCard({
  originalPrice,
  discountPrice,
  features = [],
  onContinue,
  ctaLabel,
}) {
  const savings = originalPrice - discountPrice;
  const savingsPct = Math.round((savings / originalPrice) * 100);

  const fmt = (n) =>
    "₦" + n.toLocaleString("en-NG");

  return (
    <div className="relative rounded-2xl overflow-hidden border border-academy-primary/30 bg-academy-deep/60 backdrop-blur-sm">
      {/* Savings badge */}
      <div className="absolute top-4 right-4 bg-academy-yellow text-academy-dark text-xs font-bold px-3 py-1 rounded-full">
        SAVE {savingsPct}%
      </div>

      <div className="p-8">
        {/* Price block */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-1">Complete Course</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-white">{fmt(discountPrice)}</span>
            <span className="text-gray-500 line-through text-lg mb-1">{fmt(originalPrice)}</span>
          </div>
          <p className="text-academy-yellow text-sm mt-2 font-medium">
            Early Bird · Save {fmt(savings)}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-academy-primary/20 mb-6" />

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
              <IoCheckmarkCircle className="text-academy-yellow flex-shrink-0 text-base" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={onContinue}
          className="btn-primary w-full text-base py-3"
        >
          {ctaLabel ?? `Enroll Now — ${fmt(discountPrice)}`}
        </button>

        <p className="text-center text-gray-500 text-xs mt-4">
          Secure payment · Starts May 4, 2026
        </p>
      </div>
    </div>
  );
}
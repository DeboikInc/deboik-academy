"use client";

import { useState, useEffect } from "react";
import { IoCheckmarkCircle, IoTimeOutline } from "react-icons/io5";

export default function PricingCard({
  originalPrice,
  discountPrice,
  features = [],
  onContinue,
  ctaLabel,
  courseStartDate = "2026-05-04", // Format: YYYY-MM-DD
  earlyBirdEndDate = "2026-05-02", // Format: YYYY-MM-DD (2 days before start)
  showCountdown = true,
}) {
  const [isEarlyBirdActive, setIsEarlyBirdActive] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [currentDiscountPrice, setCurrentDiscountPrice] = useState(discountPrice);
  const [currentOriginalPrice, setCurrentOriginalPrice] = useState(originalPrice);

  // Calculate if Early Bird is still active
  const checkEarlyBirdStatus = () => {
    const now = new Date();
    const endDate = new Date(earlyBirdEndDate);
    const start = new Date(courseStartDate);

    // Early Bird ends at 11:59:59 PM on the end date
    endDate.setHours(23, 59, 59, 999);

    const isActive = now < endDate;
    setIsEarlyBirdActive(isActive);

    // If Early Bird is expired, show original price
    if (!isActive) {
      setCurrentDiscountPrice(originalPrice);
    } else {
      setCurrentDiscountPrice(discountPrice);
    }

    return isActive;
  };

  // Calculate countdown to Early Bird end
  const calculateCountdown = () => {
    const now = new Date();
    const endDate = new Date(earlyBirdEndDate);
    endDate.setHours(23, 59, 59, 999);

    const diff = endDate - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Update countdown every second
  useEffect(() => {
    checkEarlyBirdStatus();

    const interval = setInterval(() => {
      const isActive = checkEarlyBirdStatus();
      setCountdown(calculateCountdown());

      // Re-check every minute if not active
      if (!isActive) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [earlyBirdEndDate, courseStartDate, originalPrice, discountPrice]);

  const fmt = (n) => "₦" + n.toLocaleString("en-NG");
  const savings = currentOriginalPrice - currentDiscountPrice;
  const savingsPct = Math.round((savings / currentOriginalPrice) * 100);

  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NG", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-academy-primary/30 bg-academy-deep/60 backdrop-blur-sm">
      {/* Savings badge - only show if Early Bird is active */}
      {isEarlyBirdActive && savings > 0 && (
        <div className="absolute top-4 right-4 bg-academy-yellow text-academy-dark text-xs font-bold px-3 py-1 rounded-full z-10">
          SAVE {savingsPct}%
        </div>
      )}

      {/* Expired badge */}
      {!isEarlyBirdActive && (
        <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          EARLY BIRD ENDED
        </div>
      )}

      <div className="p-8">
        {/* Countdown Timer */}
        {showCountdown && isEarlyBirdActive && countdown && (
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
              <div className="text-center">
                <div className="bg-academy-dark rounded-lg px-3 py-1 min-w-[50px]">
                  <span className="text-white font-bold text-xl">{countdown.hours}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">Hours</p>
              </div>
              <div className="text-center">
                <div className="bg-academy-dark rounded-lg px-3 py-1 min-w-[50px]">
                  <span className="text-white font-bold text-xl">{countdown.minutes}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">Mins</p>
              </div>
              <div className="text-center">
                <div className="bg-academy-dark rounded-lg px-3 py-1 min-w-[50px]">
                  <span className="text-white font-bold text-xl">{countdown.seconds}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">Secs</p>
              </div>
            </div>
          </div>
        )}

        {/* Price block */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-1">Complete Course</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-white">{fmt(currentDiscountPrice)}</span>
            {isEarlyBirdActive && (
              <span className="text-gray-500 line-through text-lg mb-1">{fmt(currentOriginalPrice)}</span>
            )}
          </div>
          {isEarlyBirdActive ? (
            <p className="text-academy-yellow text-sm mt-2 font-medium">
              Early Bird · Save {fmt(savings)}
            </p>
          ) : (
            <p className="text-gray-400 text-sm mt-2">
              Regular pricing · Course starts {formatDate(courseStartDate)}
            </p>
          )}
        </div>

        {/* Early Bird Date Info */}
        {isEarlyBirdActive && (
          <div className="mb-4 p-2 bg-academy-primary/10 rounded-lg">
            <p className="text-gray-400 text-xs text-center">
              ⏰ Early Bird ends: {formatDate(earlyBirdEndDate)} at 11:59 PM
            </p>
            <p className="text-gray-500 text-xs text-center mt-1">
              Course starts: {formatDate(courseStartDate)}
            </p>
          </div>
        )}

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
          {`Enroll Now — ${fmt(currentDiscountPrice)}`}
        </button>

        <p className="text-center text-gray-500 text-xs mt-4">
          Secure payment · Starts {formatDate(courseStartDate)}
        </p>
      </div>
    </div>
  );
}
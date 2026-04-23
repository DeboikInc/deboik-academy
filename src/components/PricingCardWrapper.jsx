"use client";

import { useRouter } from "next/navigation";
import PricingCard from "@/components/PricingCard";

export default function PricingCardWrapper({ originalPrice, discountPrice, features }) {
  const router = useRouter();

  return (
    <PricingCard
      originalPrice={originalPrice}
      discountPrice={discountPrice}
      features={features}
      onContinue={() => router.push("/enroll")}
      ctaLabel={`Enroll Now — ₦${discountPrice.toLocaleString("en-NG")}`}
    />
  );
}

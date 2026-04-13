"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoArrowForward, IoMail, IoSchool } from "react-icons/io5";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Success() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setLoading(false);
        return;
      }

      try {
        await fetch(`/api/payment/verify?reference=${reference}`);
      } catch (error) {
        console.error("Verification error:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <main className="min-h-screen bg-academy-dark">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <IoCheckmarkCircle className="text-green-500 text-5xl" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Payment Successful!
            </h1>

            <p className="text-xl text-gray-400 mb-8">
              Welcome to Deboik Academy. Your journey to becoming a full-stack developer starts now.
            </p>

            <div className="bg-academy-deep/50 rounded-xl p-6 border border-green-500/20 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">What's Next?</h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start space-x-3">
                  <IoMail className="text-academy-yellow mt-1" />
                  <span className="text-gray-300">
                    Check your email for course access details
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <IoSchool className="text-academy-yellow mt-1" />
                  <span className="text-gray-300">
                    Access your course dashboard to start learning
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <IoArrowForward className="text-academy-yellow mt-1" />
                  <span className="text-gray-300">
                    Begin with JavaScript Fundamentals
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/" className="btn-primary">
                Go to Dashboard
              </Link>
              <Link href="/course" className="btn-secondary">
                View Course Content
              </Link>
            </div>

            {reference && (
              <p className="text-gray-500 text-sm mt-8">
                Transaction Reference: {reference}
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
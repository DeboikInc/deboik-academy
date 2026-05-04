"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IoLogoWhatsapp, IoClose, IoChatbubbles, IoTime, IoCheckmarkCircle } from "react-icons/io5";

export default function Whatsapp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const hotlineNumber = "2349125273293";

  // Check if support is online (e.g., within business hours)
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      // Monday-Friday, 9AM - 6PM
      const isBusinessHours = day >= 1 && day <= 5 && hour >= 9 && hour < 18;
      setIsOnline(isBusinessHours);
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const getQuickReply = (category) => {
    const messages = {
      enrollment: "I need help with the enrollment process.",
      payment: "I have a question about payment.",
      technical: "I need technical support for the course.",
      certificate: "I want to inquire about the certificate/internship.",
    };

    return encodeURIComponent(
      `Hello Deboik Academy Student Success Team,\n\n` +
      `I need assistance with: ${messages[category]}\n\n` +
      `My Name: \n` +
      `My Email: \n\n` +
      `Thank you!`
    );
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Expanded Chat Panel */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 mb-2 w-80 bg-academy-deep border border-academy-primary/20 rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="bg-green-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <IoChatbubbles className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Student Success Hotline</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      {isOnline ? (
                        <>
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          <span className="text-green-300 text-xs">Online • Usually replies in minutes</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                          <span className="text-gray-300 text-xs">Offline • Will respond next business day</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <IoClose size={20} />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-academy-primary/20">
              <p className="text-gray-400 text-xs mb-3">Quick assistance for:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => window.open(`https://wa.me/${hotlineNumber}?text=${getQuickReply("enrollment")}`, "_blank")}
                  className="bg-academy-primary/20 hover:bg-academy-primary/30 text-gray-300 text-xs py-2 px-3 rounded-lg transition-colors text-left"
                >
                  📝 Enrollment
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/${hotlineNumber}?text=${getQuickReply("payment")}`, "_blank")}
                  className="bg-academy-primary/20 hover:bg-academy-primary/30 text-gray-300 text-xs py-2 px-3 rounded-lg transition-colors text-left"
                >
                  💰 Payment
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/${hotlineNumber}?text=${getQuickReply("technical")}`, "_blank")}
                  className="bg-academy-primary/20 hover:bg-academy-primary/30 text-gray-300 text-xs py-2 px-3 rounded-lg transition-colors text-left"
                >
                  🔧 Technical
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/${hotlineNumber}?text=${getQuickReply("certificate")}`, "_blank")}
                  className="bg-academy-primary/20 hover:bg-academy-primary/30 text-gray-300 text-xs py-2 px-3 rounded-lg transition-colors text-left"
                >
                  🎓 Certificate/Internship
                </button>
              </div>
            </div>

            {/* Support Hours */}
            <div className="p-4 bg-academy-dark/50">
              <div className="flex items-center gap-2 mb-2">
                <IoTime className="text-academy-yellow text-sm" />
                <p className="text-white text-xs font-medium">Support Hours</p>
              </div>
              <p className="text-gray-400 text-xs">Monday - Friday: 9:00 AM - 6:00 PM WAT</p>
              <p className="text-gray-500 text-xs mt-1">Messages outside hours will be answered next business day</p>

              <div className="mt-3 pt-3 border-t border-academy-primary/20">
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <IoCheckmarkCircle className="text-green-500" />
                  Average response time: &lt; 5 minutes during business hours
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-white px-4 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2 shadow-xl ${isOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-green-500 hover:bg-green-600"
            }`}
        >
          <div className="relative">
            <IoLogoWhatsapp size="24" className="transition-transform" />
            {!isOpen && isOnline && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </div>
          <span className="text-sm font-medium hidden md:inline">
            {isOpen ? "Close" : "Student Success Hotline"}
          </span>
        </button>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
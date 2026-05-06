import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCardWrapper from "@/components/PricingCardWrapper";
import CohortBanner from "@/components/CohortBanner";
import {
  IoCodeSlash,
  IoDiamond,
  IoRocket,
  IoCheckmarkCircle,
  IoDesktop,
  IoPhonePortrait,
  IoGlobe,
  IoLocation,
  IoCalendar,
  IoTime,
  IoBriefcase,
} from "react-icons/io5";
import Link from "next/link";

const HOME_PRICING_FEATURES = [
  "JavaScript Fundamentals",
  "Backend Development (Node.js)",
  "Frontend Development (React)",
  "Mobile Development (React Native)",
  "Desktop Development (Electron)",
  "Internship Opportunity",
  "Completion Certificate",
  "Hybrid Learning (Online / Offline)",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-academy-dark">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-academy-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-academy-yellow/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="inline-flex items-center space-x-2 bg-academy-primary/20 rounded-full px-4 py-2">
                <IoDiamond className="text-academy-yellow" />
                <span className="text-sm text-academy-yellow">Now Enrolling 2026</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Learn JavaScript Once.
              <br />
              <span className="text-gradient">Build for All Platforms</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Stop rewriting your app for every platform. Master JavaScript once, and deploy everywhere.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/enroll" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Reserve Early Bird Spot
              </Link>
              <Link href="/course" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                View Curriculum
              </Link>
            </div>
        <CohortBanner/>
          </div>
        </div>
      </section>

      {/* ── Real-World Examples ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real-World Examples</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Companies and frameworks that prove "learn once, build everywhere" works
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Web */}
            <div className="bg-academy-deep/30 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoGlobe className="text-blue-400 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Web</h3>
              <p className="text-gray-400">React · Next JS</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-academy-primary/20">
                {[
                  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
                  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", alt: "Vue" },
                  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", alt: "Angular" },
                ].map(({ src, alt }) => (
                  <div key={alt} className="flex flex-col items-center">
                    <img src={src} alt={alt} className="w-6 h-6" />
                    <span className="text-xs text-gray-500 mt-1">{alt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="bg-academy-deep/30 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoPhonePortrait className="text-green-400 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile</h3>
              <p className="text-gray-400">React Native</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-academy-primary/20">
                <p className="text-sm text-gray-500 mt-2">Used by Facebook, Instagram, Discord</p>
                {[
                  { src: "https://cdn.simpleicons.org/facebook/1877F2", alt: "Facebook", cls: "rounded" },
                  { src: "https://cdn.simpleicons.org/instagram/E4405F", alt: "Instagram" },
                  { src: "https://cdn.worldvectorlogo.com/logos/discord.svg", alt: "Discord" },
                ].map(({ src, alt, cls }) => (
                  <div key={alt} className="flex flex-col items-center">
                    <img src={src} alt={alt} className={`w-6 h-6 ${cls ?? ""}`} />
                    <span className="text-xs text-gray-500 mt-1">{alt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop */}
            <div className="bg-academy-deep/30 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoDesktop className="text-purple-400 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Desktop</h3>
              <p className="text-gray-400">Electron</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-academy-primary/20">
                <p className="text-sm text-gray-500 mt-2">Used by VS Code, Slack, Discord, Figma</p>
                {[
                  { src: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg", alt: "VS Code" },
                  { src: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg", alt: "Slack" },
                  { src: "https://cdn.worldvectorlogo.com/logos/discord.svg", alt: "Discord" },
                  { src: "https://cdn.worldvectorlogo.com/logos/figma-icon.svg", alt: "Figma" },
                ].map(({ src, alt }) => (
                  <div key={alt} className="flex flex-col items-center">
                    <img src={src} alt={alt} className="w-6 h-6" />
                    <span className="text-xs text-gray-500 mt-1">{alt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-academy-deep/30 p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoCodeSlash className="text-yellow-400 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Backend</h3>
              <p className="text-gray-400">Node.js</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-academy-primary/20">
                <p className="text-sm text-gray-500 mt-2">Used by Netflix, Uber, PayPal, LinkedIn</p>
                {[
                  { src: "https://cdn.worldvectorlogo.com/logos/netflix-logo-icon.svg", alt: "Netflix" },
                  { src: "https://cdn.worldvectorlogo.com/logos/uber-2.svg", alt: "Uber", cls: "invert" },
                  { src: "https://cdn.worldvectorlogo.com/logos/paypal-4.svg", alt: "PayPal" },
                  { src: "https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg", alt: "LinkedIn" },
                ].map(({ src, alt, cls }) => (
                  <div key={alt} className="flex flex-col items-center">
                    <img src={src} alt={alt} className={`w-6 h-6 ${cls ?? ""}`} />
                    <span className="text-xs text-gray-500 mt-1">{alt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack Banner ── */}
      <section className="py-12 bg-academy-dark border-y border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">Build with industry-leading frameworks</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: <IoCodeSlash size={24} />, label: "React" },
              { icon: <IoGlobe size={24} />, label: "Express.js" },
              { icon: <IoPhonePortrait size={24} />, label: "React Native" },
              { icon: <IoDesktop size={24} />, label: "Electron" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center space-x-2 text-gray-400">
                {icon}
                <span className="text-xl font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What You Will Learn</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A comprehensive journey from JavaScript fundamentals to building production-ready applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <IoCodeSlash className="text-academy-yellow text-2xl" />,
                title: "JavaScript Fundamentals",
                desc: "Master the core concepts: variables, functions, objects, arrays, and modern ES6+ features.",
                points: ["Variables & Data Types", "Functions & Scope", "Async JavaScript"],
              },
              {
                icon: <IoGlobe className="text-academy-yellow text-2xl" />,
                title: "Backend Development",
                desc: "Build powerful server-side applications with Node.js and Express.",
                points: ["Node.js & NPM", "Express & APIs", "Database Integration"],
              },
              {
                icon: <IoDesktop className="text-academy-yellow text-2xl" />,
                title: "Frontend Development",
                desc: "Create stunning user interfaces with React, or React Native, Electron or Next.js.",
                points: ["React, Hooks & Core Components", "Electron Architecture", "Next.js Framework", "State Management"],
              },
            ].map(({ icon, title, desc, points }) => (
              <div key={title} className="bg-academy-deep/30 p-8 rounded-2xl">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6">{icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 mb-4">{desc}</p>
                <ul className="space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-center space-x-2 text-gray-300">
                      <IoCheckmarkCircle className="text-academy-yellow" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-gray-400">Join live classes in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "1", title: "Register", desc: "Sign up with your name and email to secure your seat" },
              { n: "2", title: "Pay", desc: "Complete payment to confirm enrollment" },
              { n: "3", title: "Attend Live Classes", desc: "Join realtime sessions with instructors and peers" },
            ].map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-20 h-20 bg-academy-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-academy-yellow">{n}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Deboik Academy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <IoRocket />, title: "Hands-on Projects", desc: "Build real-world applications as you learn" },
              { icon: <IoCodeSlash />, title: "Expert Instructors", desc: "Learn from industry professionals" },
              { icon: <IoDiamond />, title: "Certification", desc: "Earn a recognized completion certificate" },
              { icon: <IoBriefcase />, title: "Internship Opportunity", desc: "Get Employed as an Intern at Deboik International" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
                <div className="text-academy-yellow text-2xl mb-4">{icon}</div>
                <h4 className="text-white font-semibold mb-2">{title}</h4>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              16-week full-stack JavaScript program. Online &amp; in-person cohorts available.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <PricingCardWrapper
              originalPrice={650000}
              discountPrice={450000}
              features={HOME_PRICING_FEATURES}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IoCodeSlash, IoDiamond, IoRocket, IoCheckmarkCircle, IoDesktop, IoPhonePortrait, IoGlobe, IoWarning, IoLogoApple, IoLogoWindows, IoLogoGoogle, IoDownload, IoTime, IoLocation, IoCalendar } from "react-icons/io5";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-academy-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 academy-gradient opacity-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-academy-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-academy-yellow/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="inline-flex items-center space-x-2 bg-academy-primary/20 rounded-full px-4 py-2">
                <IoDiamond className="text-academy-yellow" />
                <span className="text-sm text-academy-yellow">Now Enrolling for 2026</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-academy-primary/20 rounded-full px-4 py-2">
                <IoLocation className="text-academy-yellow" />
                <span className="text-sm text-academy-yellow">Online & Offline</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Learn JavaScript Once.
              <br />
              <span className="text-gradient">Build for All Platforms</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Master the most versatile programming language and build web, mobile, and desktop applications. One language. Infinite possibilities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/enroll" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Reserve Early Bird Spot
              </Link>
              <Link href="#lead-magnet" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                Get Free Roadmap PDF
              </Link>
            </div>

            {/* Date & Duration Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <IoCalendar className="text-academy-yellow" />
                <span>Starts May 4, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <IoTime className="text-academy-yellow" />
                <span>16 Weeks (4 Months)</span>
              </div>
              <div className="flex items-center gap-2">
                <IoLocation className="text-academy-yellow" />
                <span>Hybrid Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: The Problem We Solve */}
      <section className="py-20 bg-academy-deep/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-academy-primary/20 rounded-full px-4 py-2 mb-6">
                <IoWarning className="text-academy-yellow" />
                <span className="text-sm text-academy-yellow">The Reality Check</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Problem We Solve
              </h2>
              <div className="space-y-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    "You learn React for web. Then Swift for iOS. Then Kotlin for Android. Then Python for backend. <span className="text-red-400 font-bold">That's 4x the learning.</span>"
                  </p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <span className="text-academy-yellow font-bold">We say:</span> Learn JavaScript deeply once, and you're <span className="text-green-400 font-bold">80% ready for every platform.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-academy-primary/20 rounded-2xl blur-3xl" />
              <div className="relative bg-academy-deep/50 rounded-2xl p-8 border border-academy-primary/20">
                <h3 className="text-xl font-bold text-white mb-4">Stop rebuilding. Start deploying.</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Traditional path</span>
                    <span className="text-red-400">4+ languages to learn</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">With JavaScript</span>
                    <span className="text-green-400">1 language → 4 platforms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Real-World Examples */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real-World Examples
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Companies and frameworks that prove "learn once, build everywhere" works
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="academy-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoGlobe className="text-blue-400 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Web</h3>
              <p className="text-gray-400">React · Vue · Angular</p>
              <p className="text-sm text-gray-500 mt-2">The most popular web frameworks</p>
            </div>

            <div className="academy-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoPhonePortrait className="text-green-400 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile</h3>
              <p className="text-gray-400">React Native</p>
              <p className="text-sm text-gray-500 mt-2">Used by Facebook, Instagram, Discord</p>
            </div>

            <div className="academy-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoDesktop className="text-purple-400 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Desktop</h3>
              <p className="text-gray-400">Electron</p>
              <p className="text-sm text-gray-500 mt-2">VS Code, Slack, Discord, Figma</p>
            </div>

            <div className="academy-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoCodeSlash className="text-yellow-400 text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Backend</h3>
              <p className="text-gray-400">Node.js</p>
              <p className="text-sm text-gray-500 mt-2">Netflix, Uber, PayPal, LinkedIn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Icons */}
      <section className="py-12 bg-academy-dark border-y border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">Build with industry-leading frameworks</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center space-x-2 text-gray-400">
              <IoCodeSlash size={24} />
              <span className="text-xl font-semibold">React</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <IoGlobe size={24} />
              <span className="text-xl font-semibold">Node.js</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <IoPhonePortrait size={24} />
              <span className="text-xl font-semibold">React Native</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <IoDesktop size={24} />
              <span className="text-xl font-semibold">Electron</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You Will Learn
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A comprehensive journey from JavaScript fundamentals to building production-ready applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="academy-card p-8 rounded-2xl">
              <div className="w-14 h-14 bg-academy-primary/20 rounded-xl flex items-center justify-center mb-6">
                <IoCodeSlash className="text-academy-yellow text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">JavaScript Fundamentals</h3>
              <p className="text-gray-400 mb-4">
                Master the core concepts: variables, functions, objects, arrays, and modern ES6+ features.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Variables & Data Types</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Functions & Scope</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Async JavaScript</span>
                </li>
              </ul>
            </div>

            <div className="academy-card p-8 rounded-2xl">
              <div className="w-14 h-14 bg-academy-primary/20 rounded-xl flex items-center justify-center mb-6">
                <IoGlobe className="text-academy-yellow text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Backend Development</h3>
              <p className="text-gray-400 mb-4">
                Build powerful server-side applications with Node.js and Express.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Node.js & NPM</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Express & APIs</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Database Integration</span>
                </li>
              </ul>
            </div>

            <div className="academy-card p-8 rounded-2xl">
              <div className="w-14 h-14 bg-academy-primary/20 rounded-xl flex items-center justify-center mb-6">
                <IoDesktop className="text-academy-yellow text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Frontend Development</h3>
              <p className="text-gray-400 mb-4">
                Create stunning user interfaces with React and Next.js.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>React & Hooks</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Next.js Framework</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>State Management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Program Schedule Section - NEW */}
      <section className="py-20 bg-academy-deep/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Program Schedule & Delivery
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              16 weeks to transform your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="academy-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <IoCalendar className="text-academy-yellow" />
                Key Dates
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center pb-3 border-b border-academy-primary/20">
                  <span className="text-gray-400">Start Date</span>
                  <span className="text-white font-semibold">May 4, 2026</span>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-academy-primary/20">
                  <span className="text-gray-400">End Date</span>
                  <span className="text-white font-semibold">August 20, 2026</span>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-academy-primary/20">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-semibold">16 Weeks (4 Months)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-400">Weekly Commitment</span>
                  <span className="text-white font-semibold">6-8 Hours</span>
                </li>
              </ul>
            </div>

            <div className="academy-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <IoLocation className="text-academy-yellow" />
                Learning Format
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 pb-3 border-b border-academy-primary/20">
                  <IoDesktop className="text-academy-yellow" />
                  <span className="text-gray-300">Online (Live & Recorded)</span>
                </li>
                <li className="flex items-center gap-3 pb-3 border-b border-academy-primary/20">
                  <IoLocation className="text-academy-yellow" />
                  <span className="text-gray-300">In-Person (Physical Location)</span>
                </li>
                <li className="flex items-center gap-3">
                  <IoTime className="text-academy-yellow" />
                  <span className="text-gray-300">Flexible Schedule Options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-academy-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-academy-yellow">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Register</h3>
              <p className="text-gray-400">
                Sign up with your name and email to secure your spot in the course.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-academy-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-academy-yellow">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pay</h3>
              <p className="text-gray-400">
                Complete your payment securely through our payment gateway.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-academy-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-academy-yellow">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start Learning</h3>
              <p className="text-gray-400">
                Get immediate access to course materials and begin your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-academy-deep/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Deboik Academy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoRocket className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Hands-on Projects</h4>
              <p className="text-gray-400 text-sm">
                Build real-world applications as you learn
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoCodeSlash className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Expert Instructors</h4>
              <p className="text-gray-400 text-sm">
                Learn from industry professionals
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoDiamond className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Certification</h4>
              <p className="text-gray-400 text-sm">
                Earn a recognized completion certificate
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoCheckmarkCircle className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Lifetime Access</h4>
              <p className="text-gray-400 text-sm">
                Access course materials forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Lead Magnet - Free PDF Roadmap */}
      <section id="lead-magnet" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12 glow-effect">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-academy-primary/20 rounded-full px-4 py-2 mb-6">
                <IoDownload className="text-academy-yellow" />
                <span className="text-sm text-academy-yellow">Free Download</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The "Learn Once, Build Everywhere" Roadmap
              </h2>
              <p className="text-gray-400 text-lg">
                Your free PDF guide to mastering cross-platform development with JavaScript
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-academy-deep/50 rounded-xl p-6">
                <h3 className="text-white font-bold mb-4">What's inside:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-300">
                    <IoCheckmarkCircle className="text-academy-yellow text-sm" />
                    <span>Platform comparison matrix</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <IoCheckmarkCircle className="text-academy-yellow text-sm" />
                    <span>Code reuse strategies</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <IoCheckmarkCircle className="text-academy-yellow text-sm" />
                    <span>Case studies (companies that saved 60%+ dev time)</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <IoCheckmarkCircle className="text-academy-yellow text-sm" />
                    <span>Resource list (best JS courses for cross-platform)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-academy-deep/50 rounded-xl p-6">
                <h3 className="text-white font-bold mb-4">Plus bonus:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-300">
                    <IoCheckmarkCircle className="text-academy-yellow text-sm" />
                    <span>5-day email course</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <IoCheckmarkCircle className="text-academy-yellow text-sm" />
                    <span>Project checklist</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <IoCheckmarkCircle className="text-academy-yellow text-sm" />
                    <span>Early access to new content</span>
                  </li>
                </ul>
              </div>
            </div>

            <form className="max-w-md mx-auto space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-academy-deep border border-academy-primary/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-academy-yellow"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-3 bg-academy-deep border border-academy-primary/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-academy-yellow"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full text-lg py-3">
                Download Free PDF → Get 5-Day Email Course
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-academy-deep/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              16-week full-stack JavaScript program. Online & in-person cohorts available.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="academy-card rounded-2xl p-8 glow-effect">
              <div className="text-center mb-8">
                <h3 className="text-xl text-gray-400 mb-2">Universal JS Course</h3>
                <div className="flex items-center justify-center gap-3">
                  <div>
                    <span className="text-4xl font-bold text-white">₦450,000</span>
                    <p className="text-academy-yellow text-sm mt-1">Early Bird (Limited)</p>
                  </div>
                  <div className="text-gray-500 line-through">₦650,000</div>
                </div>
                <p className="text-gray-500 text-sm mt-4">Early bird pricing ends soon</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>JavaScript Fundamentals</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Backend Development (Node.js)</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Frontend Development (React)</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Mobile Development (React Native)</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Desktop Development (Electron)</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Lifetime Access</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Completion Certificate</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Hybrid Learning (Online/Offline)</span>
                </li>
              </ul>

              <Link href="/enroll" className="btn-primary w-full text-center block text-lg py-3">
                Enroll Now - Reserve Your Spot
              </Link>
              <p className="text-center text-gray-500 text-sm mt-4">
                Starts May 4, 2026 · Limited seats available
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
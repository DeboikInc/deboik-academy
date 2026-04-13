import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IoCodeSlash, IoDiamond, IoRocket, IoCheckmarkCircle, IoDesktop, IoPhonePortrait, IoGlobe } from "react-icons/io5";
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
            <div className="inline-flex items-center space-x-2 bg-academy-primary/20 rounded-full px-4 py-2 mb-6">
              <IoDiamond className="text-academy-yellow" />
              <span className="text-sm text-academy-yellow">Now Enrolling for 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Learn JavaScript Once.
              <br />
              <span className="text-gradient">Build for All Platforms</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Master the most versatile programming language and buildweb, mobile, and desktop applications. One language. Infinite possibilities.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/enroll" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Start Learning Today
              </Link>
              <Link href="/course" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                View Course
              </Link>
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

      {/* How It Works */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
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
                Complete your payment securely through ourPayment gateway.
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
      <section className="py-20">
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

      {/* Pricing */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="academy-card rounded-2xl p-8 glow-effect">
              <div className="text-center mb-8">
                <h3 className="text-xl text-gray-400 mb-2">Universal JS Course</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-4xl font-bold text-white">₦50,000</span>
                  <span className="text-gray-400 line-through">₦100,000</span>
                </div>
                <p className="text-academy-yellow mt-2">Early Bird Pricing</p>
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
                  <span>Lifetime Access</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Completion Certificate</span>
                </li>
              </ul>

              <Link href="/enroll" className="btn-primary w-full text-center block text-lg">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
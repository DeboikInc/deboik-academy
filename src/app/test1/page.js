import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IoCodeSlash, IoDiamond, IoRocket, IoCheckmarkCircle, IoDesktop, IoPhonePortrait, IoGlobe, IoBriefcase, IoCalendar, IoLocation, IoTime } from "react-icons/io5";
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
                <span className="text-sm text-academy-yellow">Now Enrolling 2026</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-academy-primary/20 rounded-full px-4 py-2">
                <IoLocation className="text-academy-yellow" />
                <span className="text-sm text-academy-yellow">Online & Offline</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-academy-primary/20 rounded-full px-4 py-2">
                <IoCalendar className="text-academy-yellow" />
                <span className="text-sm text-academy-yellow">Starts May 4, 2026</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Learn JavaScript Once.
              <br />
              <span className="text-gradient">Build for All Platforms</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Live classes. 16 weeks. Master JavaScript and build web, mobile, and desktop apps.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/enroll" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                Join Live Classes
              </Link>
              <Link href="/course" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Reality Check - with recognizable company logos */}
      <section className="py-16 bg-academy-deep/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Reality Check
              </h2>
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                  <p className="text-gray-300">
                    "Learn React for web. Then Swift for iOS. Then Kotlin for Android. Then Python for backend."
                  </p>
                  <p className="text-red-400 font-bold mt-2">That's 4 different languages.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                  <p className="text-academy-yellow font-bold mb-2">We say:</p>
                  <p className="text-gray-300">Learn JavaScript once. Build for all platforms.</p>
                  <p className="text-green-400 font-bold mt-2">One language. Infinite possibilities.</p>
                </div>
              </div>
            </div>

            <div className="bg-academy-deep/50 rounded-xl p-6 border border-academy-primary/20">
              <h3 className="text-white font-bold text-center mb-4">Trusted by companies building cross-platform</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-bold">Netflix</div>
                  <div className="text-xs text-gray-500">Node.js</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-bold">Uber</div>
                  <div className="text-xs text-gray-500">Node.js</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-bold">Discord</div>
                  <div className="text-xs text-gray-500">Electron</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-green-400 font-bold">Facebook</div>
                  <div className="text-xs text-gray-500">React Native</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-bold">VS Code</div>
                  <div className="text-xs text-gray-500">Electron</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-yellow-400 font-bold">PayPal</div>
                  <div className="text-xs text-gray-500">Node.js</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="py-8 border-y border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="flex items-center gap-2 text-academy-yellow justify-center">
                <IoCalendar />
                <span className="text-white font-semibold">May 4 - Aug 20, 2026</span>
              </div>
              <p className="text-gray-500 text-sm">16 Weeks</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-academy-yellow justify-center">
                <IoTime />
                <span className="text-white font-semibold">Live Classes</span>
              </div>
              <p className="text-gray-500 text-sm">Realtime instruction</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-academy-yellow justify-center">
                <IoLocation />
                <span className="text-white font-semibold">Hybrid</span>
              </div>
              <p className="text-gray-500 text-sm">Online or in-person</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Simplified */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              What You'll Learn
            </h2>
            <p className="text-gray-400">One JavaScript curriculum. Four platforms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-academy-deep/30 rounded-xl">
              <IoCodeSlash className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h3 className="text-white font-bold">JavaScript Core</h3>
              <p className="text-gray-400 text-sm">ES6+, Async, DOM</p>
            </div>
            <div className="text-center p-6 bg-academy-deep/30 rounded-xl">
              <IoGlobe className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h3 className="text-white font-bold">Backend</h3>
              <p className="text-gray-400 text-sm">Node.js, Express, APIs</p>
            </div>
            <div className="text-center p-6 bg-academy-deep/30 rounded-xl">
              <IoDesktop className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h3 className="text-white font-bold">Frontend</h3>
              <p className="text-gray-400 text-sm">React, Next.js</p>
            </div>
            <div className="text-center p-6 bg-academy-deep/30 rounded-xl">
              <IoPhonePortrait className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h3 className="text-white font-bold">Mobile</h3>
              <p className="text-gray-400 text-sm">React Native</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - FIXED for live classes */}
      <section className="py-16 bg-academy-deep/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              How It Works
            </h2>
            <p className="text-gray-400">Join live classes in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-academy-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-academy-yellow">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Register</h3>
              <p className="text-gray-400 text-sm">
                Sign up with your name and email to secure your seat
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-academy-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-academy-yellow">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pay</h3>
              <p className="text-gray-400 text-sm">
                Complete payment to confirm enrollment
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-academy-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-academy-yellow">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Attend Live Classes</h3>
              <p className="text-gray-400 text-sm">
                Join realtime sessions with instructors and peers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose - Added Internship at POS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Why Choose Deboik Academy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoRocket className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h4 className="text-white font-semibold">Hands-on Projects</h4>
              <p className="text-gray-400 text-sm">Build real-world applications as you learn</p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoBriefcase className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h4 className="text-white font-semibold">Internship Opportunity</h4>
              <p className="text-gray-400 text-sm">Internship at Deboik International POS</p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoDiamond className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h4 className="text-white font-semibold">Certificate</h4>
              <p className="text-gray-400 text-sm">Earn a recognized completion certificate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Updated to correct prices */}
      <section className="py-16 bg-academy-deep/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Pricing
            </h2>
            <p className="text-gray-400">16 weeks · Live classes · Online & offline</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="academy-card rounded-2xl p-8 glow-effect">
              <div className="text-center mb-6">
                <h3 className="text-xl text-gray-400 mb-2">Universal JavaScript Course</h3>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold text-white">₦450,000</span>
                  <span className="text-gray-400 line-through">₦650,000</span>
                </div>
                <p className="text-academy-yellow text-sm mt-2">Early Bird Pricing</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>16 weeks live instruction</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>JavaScript → Web → Mobile → Backend</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Internship at Deboik International POS</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>Completion certificate</span>
                </li>
              </ul>

              <Link href="/enroll" className="btn-primary w-full text-center block py-3">
                Enroll Now
              </Link>
              <p className="text-center text-gray-500 text-xs mt-3">
                Starts May 4, 2026 · Limited seats
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
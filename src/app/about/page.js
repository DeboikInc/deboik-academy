import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IoSchool, IoPeople, IoHeart, IoRocket, IoVideocam, IoLocation, IoCheckmarkCircle } from "react-icons/io5";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-academy-dark">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-gradient">Deboik Academy</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Empowering the next generation of developers to build for every platform using the world's most versatile programming language.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-400 mb-6">
                At Deboik Academy, we believe that learning to code should be accessible, practical, and transformative. Our mission is to bridge the gap between aspiring developers and the skills they need to succeed in today's tech landscape.
              </p>
              <p className="text-gray-400 mb-8">
                We specialize in teaching JavaScript because it's the most versatile language in the world. With JavaScript, you can build web applications, mobile apps, desktop software, backend systems, and even AI-powered applications. One language. Infinite possibilities.
              </p>
              <Link href="/enroll" className="btn-primary">
                Start Your Journey
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-academy-primary/20 rounded-2xl blur-3xl" />
              <div className="relative academy-card p-8 rounded-2xl">
                <IoHeart className="text-academy-yellow text-6xl mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Why We Exist</h3>
                <p className="text-gray-400">
                  We saw that many aspiring developers were overwhelmed by the fragmented nature of modern tech education. They had to learn multiple languages and frameworks to build for different platforms. We created Deboik Academy to simplify this journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Reality Check - with recognizable company logos */}
      <section className="py-20 bg-academy-deep/30">
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
                {/* remove redundancy */}
                {
                  [
                    { name: "Netflix", logo: "https://cdn.worldvectorlogo.com/logos/netflix-logo-icon.svg", tech: "Node.js" },
                    { name: "Uber", csc: 'inverted', logo: "https://cdn.worldvectorlogo.com/logos/uber-2.svg", tech: "Node.js" },
                    { name: "Discord", logo: "https://cdn.worldvectorlogo.com/logos/discord.svg", tech: "Electron" },
                    { name: "Facebook", logo: "https://cdn.worldvectorlogo.com/logos/facebook-messenger-3.svg", tech: "React Native" },
                    { name: "VS Code", logo: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg", tech: "Electron" },
                    { name: "Trello", logo: "https://cdn.worldvectorlogo.com/logos/trello.svg", tech: "Node.js" },]
                    .map((company, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-blue-400 font-bold flex items-center justify-center">
                          <img src={company.logo} className={`w-8 h-6 ${company.csc === 'inverted' ? 'invert' : ''}`} />
                        </div>
                        <div className="text-xs text-gray-500">{company.tech}</div>
                      </div>
                    ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="py-20 bg-academy-deep/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Teaching Approach
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the learning path that works best for you — or combine both for maximum results
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Online Learning - Live Zoom/Meet */}
            <div className="academy-card p-8 rounded-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-academy-primary/20 rounded-xl flex items-center justify-center">
                  <IoVideocam className="text-academy-yellow text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Online Learning</h3>
                  <p className="text-academy-yellow text-sm">Live Zoom/Meet · Real-time interaction</p>
                </div>
              </div>

              <p className="text-gray-400 mb-6">
                Join live, instructor-led sessions via Zoom/Google Meet. Interact with your teacher and classmates in real-time, ask questions, and get immediate feedback — all from the comfort of your home.
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-academy-yellow text-lg mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Live weekly sessions with industry experts</span>
                </div>
                <div className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-academy-yellow text-lg mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Recorded for review anytime · Lifetime access</span>
                </div>
                <div className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-academy-yellow text-lg mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Breakout rooms for pair programming & group projects</span>
                </div>
                <div className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-academy-yellow text-lg mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Live Q&A and code reviews during class</span>
                </div>
              </div>
            </div>

            {/* Onsite Learning */}
            <div className="academy-card p-8 rounded-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-academy-primary/20 rounded-xl flex items-center justify-center">
                  <IoLocation className="text-academy-yellow text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Onsite Learning</h3>
                  <p className="text-academy-yellow text-sm">In-person training · Physical classroom</p>
                </div>
              </div>

              <p className="text-gray-400 mb-6">
                Attend classes at our physical location for face-to-face instruction, direct mentorship, and hands-on projects. Perfect for those who thrive in structured, collaborative environments.
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-academy-yellow text-lg mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">In-person mentorship & immediate feedback</span>
                </div>
                <div className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-academy-yellow text-lg mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Collaborative pair programming & team projects</span>
                </div>
                <div className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-academy-yellow text-lg mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Networking with peers & industry professionals</span>
                </div>
                <div className="flex items-start space-x-3">
                  <IoCheckmarkCircle className="text-academy-yellow text-lg mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Access to computer lab & study spaces</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hybrid Option Highlight */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-academy-primary/10 border border-academy-primary/20 rounded-xl p-4 max-w-2xl mx-auto">
              <p className="text-gray-300">
                <span className="text-academy-yellow font-bold">🎯 Best of both worlds:</span> Many students choose the <span className="text-white font-semibold">Hybrid approach</span> — attend live Zoom sessions during the week and join onsite weekend workshops for hands-on practice!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who This Course Is For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoPeople className="text-academy-yellow text-3xl mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Beginners</h4>
              <p className="text-gray-400 text-sm">
                Starting your coding journey from scratch
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoRocket className="text-academy-yellow text-3xl mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Career Switchers</h4>
              <p className="text-gray-400 text-sm">
                Transitioning into tech from another field
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoSchool className="text-academy-yellow text-3xl mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">CS Students</h4>
              <p className="text-gray-400 text-sm">
                Computer science students seeking practical skills
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoHeart className="text-academy-yellow text-3xl mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Tech Enthusiasts</h4>
              <p className="text-gray-400 text-sm">
                Anyone curious about app development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-12 text-center glow-effect">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join hundreds of students who have transformed their careers with Deboik Academy
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/enroll" className="btn-primary text-lg px-8 py-4">
                Enroll Now
              </Link>
              <Link href="/course" className="btn-secondary text-lg px-8 py-4">
                View Course Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
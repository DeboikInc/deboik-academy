import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IoSchool, IoPeople, IoHeart, IoRocket, IoVideocam, IoLocation } from "react-icons/io5";
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

      {/* Teaching Approach */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Teaching Approach
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We offer flexible learning options to suit your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="academy-card p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-academy-primary/20 rounded-xl flex items-center justify-center">
                  <IoVideocam className="text-academy-yellow text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Online Learning</h3>
                  <p className="text-gray-400 text-sm">Learn from anywhere</p>
                </div>
              </div>
              <p className="text-gray-400">
                Access comprehensive video tutorials, coding exercises, and projects from the comfort of your home. Learn at your own pace with lifetime access to all materials.
              </p>
            </div>

            <div className="academy-card p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-academy-primary/20 rounded-xl flex items-center justify-center">
                  <IoLocation className="text-academy-yellow text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Onsite Learning</h3>
                  <p className="text-gray-400 text-sm">In-person training</p>
                </div>
              </div>
              <p className="text-gray-400">
                Join our intensive in-person bootcamps for hands-on learning, direct mentorship, and collaborative projects. Perfect for those who thrive in structured environments.
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
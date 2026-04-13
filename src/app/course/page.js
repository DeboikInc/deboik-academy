import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IoCodeSlash, IoGlobe, IoDesktop, IoTime, IoCheckmarkCircle, IoDiamond, IoRocket } from "react-icons/io5";
import Link from "next/link";

export default function Course() {
  return (
    <main className="min-h-screen bg-academy-dark">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block bg-academy-primary/20 rounded-full px-4 py-2 text-sm text-academy-yellow mb-4">
              Complete Course Overview
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Universal JavaScript Course
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive program designed to take you from beginner to job-ready developer
            </p>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-12 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoTime className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h4 className="text-white font-semibold">Duration</h4>
              <p className="text-gray-400">12 Weeks (Self-paced)</p>
            </div>
            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoCodeSlash className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h4 className="text-white font-semibold">Skill Level</h4>
              <p className="text-gray-400">Beginner to Intermediate</p>
            </div>
            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
              <IoDiamond className="text-academy-yellow text-3xl mx-auto mb-3" />
              <h4 className="text-white font-semibold">Certificate</h4>
              <p className="text-gray-400">Upon Completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Module 1: JavaScript Fundamentals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-academy-primary/30 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-academy-yellow">01</span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">JavaScript Fundamentals</h2>
                <p className="text-gray-400">Building a solid foundation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Variables, Data Types, and Operators</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Control Flow: If/Else, Switch, Loops</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Functions: Declaration, Expression, Arrow Functions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Arrays and Array Methods (map, filter, reduce)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Objects and Object Manipulation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">ES6+ Features: Destructuring, Spread, Template Literals</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">DOM Manipulation and Events</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Asynchronous JavaScript: Callbacks, Promises, Async/Await</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Error Handling and Debugging</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">JavaScript Best Practices and Style Guide</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Projects You'll Build</h3>
                <ul className="space-y-3">
                  <li className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                    <span className="text-white font-medium">Interactive Calculator</span>
                    <p className="text-gray-400 text-sm mt-1">Build a fully functional calculator with DOM manipulation</p>
                  </li>
                  <li className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                    <span className="text-white font-medium">Weather Dashboard</span>
                    <p className="text-gray-400 text-sm mt-1">Consume APIs and display real-time weather data</p>
                  </li>
                  <li className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                    <span className="text-white font-medium">Task Manager App</span>
                    <p className="text-gray-400 text-sm mt-1">Create, edit, and delete tasks with local storage</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 2: Backend Development */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-academy-primary/30 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-academy-yellow">02</span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Backend Development with Node.js</h2>
                <p className="text-gray-400">Server-side mastery</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Node.js Fundamentals and Runtime</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">NPM and Package Management</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Express.js Framework and Middleware</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">RESTful API Design Principles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">CRUD Operations and Routing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Authentication: JWT and Sessions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">MongoDB and Mongoose ODM</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Database Modeling and Relationships</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Security Best Practices</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Deployment with Vercel/Railway</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Projects You'll Build</h3>
                <ul className="space-y-3">
                  <li className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                    <span className="text-white font-medium">REST API Server</span>
                    <p className="text-gray-400 text-sm mt-1">Build a complete RESTful API with authentication</p>
                  </li>
                  <li className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                    <span className="text-white font-medium">User Authentication System</span>
                    <p className="text-gray-400 text-sm mt-1">Implement JWT-based auth with secure password hashing</p>
                  </li>
                  <li className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                    <span className="text-white font-medium">Blog API with Comments</span>
                    <p className="text-gray-400 text-sm mt-1">Create a full blog backend with user interactions</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 3: Frontend Development */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-academy-primary/30 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-academy-yellow">03</span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Frontend Development with React</h2>
                <p className="text-gray-400">Modern UI engineering</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">React Fundamentals and JSX</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Components: Functional and Class-based</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Props and State Management</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">React Hooks (useState, useEffect, useContext)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Custom Hooks and Reusable Logic</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">React Router for Navigation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Next.js Framework (SSR, SSG, ISR)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">State Management: Context API</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Tailwind CSS for Styling</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                    <span className="text-gray-300">API Integration and Data Fetching</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Projects You'll Build</h3>
                <ul className="space-y-3">
                  <li className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                    <span className="text-white font-medium">E-commerce Dashboard</span>
                    <p className="text-gray-400 text-sm mt-1">Build a complete admin dashboard with data visualization</p>
                  </li>
                  <li className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                    <span className="text-white font-medium">Social Media Clone</span>
                    <p className="text-gray-400 text-sm mt-1">Create a Twitter-like app with real-time updates</p>
                  </li>
                  <li className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                    <span className="text-white font-medium">Portfolio Website</span>
                    <p className="text-gray-400 text-sm mt-1">Deploy a professional portfolio using Next.js and SEO</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You'll Achieve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoRocket className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Build Full-Stack Apps</h4>
              <p className="text-gray-400 text-sm">
                Create complete web applications from scratch, both frontend and backend
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoCodeSlash className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Write Clean Code</h4>
              <p className="text-gray-400 text-sm">
                Apply industry best practices and write maintainable, scalable code
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoGlobe className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Deploy Applications</h4>
              <p className="text-gray-400 text-sm">
                Host and deploy your applications to production environments
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoDesktop className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Problem-Solving Skills</h4>
              <p className="text-gray-400 text-sm">
                Approach complex problems with systematic debugging and solutions
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoDiamond className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Industry Standards</h4>
              <p className="text-gray-400 text-sm">
                Work with tools and workflows used by professional developers
              </p>
            </div>

            <div className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20">
              <IoCheckmarkCircle className="text-academy-yellow text-2xl mb-4" />
              <h4 className="text-white font-semibold mb-2">Career Ready</h4>
              <p className="text-gray-400 text-sm">
                Build a portfolio demonstrating real-world projects to employers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="academy-card rounded-2xl p-8 glow-effect">
              <div className="text-center mb-8">
                <h3 className="text-xl text-gray-400 mb-2">Complete Course</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-4xl font-bold text-white">₦50,000</span>
                  <span className="text-gray-400 line-through">₦100,000</span>
                </div>
                <p className="text-academy-yellow mt-2">Early Bird - Save 50%</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>All 3 Modules</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IoCheckmarkCircle className="text-academy-yellow" />
                  <span>6 Real-world Projects</span>
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
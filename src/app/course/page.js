import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCardWrapper from "@/components/PricingCardWrapper";
import {
  IoCodeSlash,
  IoGlobe,
  IoDesktop,
  IoTime,
  IoCheckmarkCircle,
  IoDiamond,
  IoRocket,
} from "react-icons/io5";

const COURSE_PRICING_FEATURES = [
  "All 3 Modules",
  "6 Real-world Projects",
  "Lifetime Access",
  "Completion Certificate",
];

export default function Course() {
  return (
    <main className="min-h-screen bg-academy-dark">
      <Navbar />

      {/* ── Hero ── */}
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

      {/* ── Overview Stats ── */}
      <section className="py-12 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <IoTime className="text-academy-yellow text-3xl mx-auto mb-3" />, title: "Duration", value: "16 Weeks (Live cohort)" },
              { icon: <IoCodeSlash className="text-academy-yellow text-3xl mx-auto mb-3" />, title: "Skill Level", value: "Beginner to Intermediate" },
              { icon: <IoDiamond className="text-academy-yellow text-3xl mx-auto mb-3" />, title: "Certificate", value: "Upon Completion" },
            ].map(({ icon, title, value }) => (
              <div key={title} className="bg-academy-deep/50 p-6 rounded-xl border border-academy-primary/20 text-center">
                {icon}
                <h4 className="text-white font-semibold">{title}</h4>
                <p className="text-gray-400">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Module 01: JS Fundamentals ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-academy-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
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
                  {[
                    "Variables, Data Types, and Operators",
                    "Control Flow: If/Else, Switch, Loops",
                    "Functions: Declaration, Expression, Arrow Functions",
                    "Arrays and Array Methods (map, filter, reduce)",
                    "Objects and Object Manipulation",
                    "ES6+ Features: Destructuring, Spread, Template Literals",
                    "DOM Manipulation and Events",
                    "Asynchronous JavaScript: Callbacks, Promises, Async/Await",
                    "Error Handling and Debugging",
                    "JavaScript Best Practices and Style Guide",
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Projects You'll Build</h3>
                <ul className="space-y-3">
                  {[
                    { title: "Interactive Calculator", desc: "Build a fully functional calculator with DOM manipulation" },
                    { title: "Weather Dashboard", desc: "Consume APIs and display real-time weather data" },
                    { title: "Task Manager App", desc: "Create, edit, and delete tasks with local storage" },
                  ].map(({ title, desc }) => (
                    <li key={title} className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                      <span className="text-white font-medium">{title}</span>
                      <p className="text-gray-400 text-sm mt-1">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Module 02: Backend ── */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-academy-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
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
                  {[
                    "Node.js Fundamentals and Runtime",
                    "NPM and Package Management",
                    "Express.js Framework and Middleware",
                    "RESTful API Design Principles",
                    "CRUD Operations and Routing",
                    "Authentication: JWT and Sessions",
                    "MongoDB and Mongoose ODM",
                    "Database Modeling and Relationships",
                    "Security Best Practices",
                    "Deployment with Vercel/Railway",
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Projects You'll Build</h3>
                <ul className="space-y-3">
                  {[
                    { title: "REST API Server", desc: "Build a complete RESTful API with authentication" },
                    { title: "User Authentication System", desc: "Implement JWT-based auth with secure password hashing" },
                    { title: "Blog API with Comments", desc: "Create a full blog backend with user interactions" },
                  ].map(({ title, desc }) => (
                    <li key={title} className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                      <span className="text-white font-medium">{title}</span>
                      <p className="text-gray-400 text-sm mt-1">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Module 03: Frontend ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-academy-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
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
                  {[
                    "React Fundamentals and JSX",
                    "Components: Functional and Class-based",
                    "Props and State Management",
                    "React Hooks (useState, useEffect, useContext)",
                    "Custom Hooks and Reusable Logic",
                    "React Router for Navigation",
                    "Next.js Framework (SSR, SSG, ISR)",
                    "State Management: Context API",
                    "Tailwind CSS for Styling",
                    "API Integration and Data Fetching",
                  ].map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <IoCheckmarkCircle className="text-academy-yellow mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Projects You'll Build</h3>
                <ul className="space-y-3">
                  {[
                    { title: "E-commerce Dashboard", desc: "Build a complete admin dashboard with data visualization" },
                    { title: "Social Media Clone", desc: "Create a Twitter-like app with real-time updates" },
                    { title: "Portfolio Website", desc: "Deploy a professional portfolio using Next.js and SEO" },
                  ].map(({ title, desc }) => (
                    <li key={title} className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                      <span className="text-white font-medium">{title}</span>
                      <p className="text-gray-400 text-sm mt-1">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Learning Outcomes ── */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What You'll Achieve</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <IoRocket />, title: "Build Full-Stack Apps", desc: "Create complete web applications from scratch, both frontend and backend" },
              { icon: <IoCodeSlash />, title: "Write Clean Code", desc: "Apply industry best practices and write maintainable, scalable code" },
              { icon: <IoGlobe />, title: "Deploy Applications", desc: "Host and deploy your applications to production environments" },
              { icon: <IoDesktop />, title: "Problem-Solving Skills", desc: "Approach complex problems with systematic debugging and solutions" },
              { icon: <IoDiamond />, title: "Industry Standards", desc: "Work with tools and workflows used by professional developers" },
              { icon: <IoCheckmarkCircle />, title: "Career Ready", desc: "Build a portfolio demonstrating real-world projects to employers" },
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Enroll?</h2>
            <p className="text-gray-400">Early bird pricing ends soon — limited seats available.</p>
          </div>
          <div className="max-w-md mx-auto">
            <PricingCardWrapper
              originalPrice={100000}
              discountPrice={50000}
              features={COURSE_PRICING_FEATURES}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
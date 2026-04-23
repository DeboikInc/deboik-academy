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
  IoPhonePortrait,
  IoLogoAndroid,
  IoLogoApple,
} from "react-icons/io5";

const COURSE_PRICING_FEATURES = [
  "JavaScript Fundamentals",
  "Backend Development (Node.js)",
  "Frontend Development (React)",
  "Mobile Development (React Native)",
  "Desktop Development (Electron)",
  "Internship Opportunity",
  "Completion Certificate",
  "Hybrid Learning (Online / Offline)",
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
                <p className="text-gray-400">Building a solid foundation for all platforms</p>
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
                <p className="text-gray-400">Server-side mastery for web and mobile apps</p>
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
                    "Security Best Practices (Helmet, CORS, Rate Limiting)",
                    "Deployment with Render / Railway / Vercel",
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

      {/* ── Module 03: Frontend (React) ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-academy-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-academy-yellow">03</span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Frontend Development with React</h2>
                <p className="text-gray-400">Modern UI engineering for web</p>
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
                    "React Hooks (useState, useEffect, useContext, useReducer)",
                    "Custom Hooks and Reusable Logic",
                    "React Router v6 for Navigation",
                    "Next.js Framework (SSR, SSG, ISR)",
                    "State Management: Context API & Redux Toolkit",
                    "Tailwind CSS / Styled Components",
                    "API Integration and Data Fetching (React Query)",
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

      {/* ── NEW Module 04: Mobile (React Native) ── */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-academy-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-academy-yellow">04</span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Mobile Development with React Native</h2>
                <p className="text-gray-400">Build iOS & Android apps with one codebase</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  {[
                    "React Native Architecture & Core Components",
                    "Navigation (React Navigation v6)",
                    "State Management in Mobile Apps (Redux, Zustand)",
                    "Native Modules & Bridging Concepts",
                    "Styling with StyleSheet & NativeWind (Tailwind)",
                    "Working with Device Features (Camera, Location, Storage)",
                    "API Integration & AsyncStorage",
                    "Push Notifications & Firebase Integration",
                    "Debugging & Performance Optimization",
                    "Building for iOS (Xcode) & Android (Android Studio)",
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
                    { title: "Weather Mobile App", desc: "Convert your weather dashboard into a mobile app" },
                    { title: "Task Manager Mobile", desc: "Sync your task manager with AsyncStorage & backend API" },
                    { title: "Social Media Feed", desc: "Build Instagram-like feed with image upload & Firebase" },
                    { title: "E-commerce Mobile App", desc: "Full shopping cart, checkout, and payment integration" },
                  ].map(({ title, desc }) => (
                    <li key={title} className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                      <span className="text-white font-medium">{title}</span>
                      <p className="text-gray-400 text-sm mt-1">{desc}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-4 pt-4 border-t border-academy-primary/20">
                  <div className="flex items-center gap-2">
                    <IoLogoApple className="text-gray-400" />
                    <span className="text-xs text-gray-500">iOS App Store ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoLogoAndroid className="text-gray-400" />
                    <span className="text-xs text-gray-500">Google Play ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW Module 05: Desktop (Electron) ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="academy-card rounded-2xl p-8 md:p-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-academy-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-academy-yellow">05</span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Desktop Development with Electron</h2>
                <p className="text-gray-400">Build cross-platform desktop apps (Windows, Mac, Linux)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  {[
                    "Electron Architecture (Main vs Renderer Process)",
                    "Setting up an Electron Project (Electron Forge / Vite)",
                    "IPC Communication (Inter-Process Communication)",
                    "Native Menus, Tray Icons & Shortcuts",
                    "File System Access (Read/Write Files)",
                    "Working with Native Dialogs (Open/Save/Error)",
                    "Auto-Updates & Crash Reporting",
                    "Packaging & Distribution (Windows .exe, Mac .dmg, Linux AppImage)",
                    "Converting Web Apps to Desktop Apps",
                    "Performance Optimization for Desktop",
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
                    { title: "Task Manager Desktop", desc: "Convert your React task manager to a standalone desktop app" },
                    { title: "Markdown Editor", desc: "Build VS Code-like markdown editor with live preview" },
                    { title: "File Organizer Tool", desc: "Create a utility app to organize files by type/date" },
                    { title: "Music Player Desktop", desc: "Build a full-featured music player with playlist support" },
                  ].map(({ title, desc }) => (
                    <li key={title} className="bg-academy-dark/50 p-4 rounded-lg border border-academy-primary/20">
                      <span className="text-white font-medium">{title}</span>
                      <p className="text-gray-400 text-sm mt-1">{desc}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-4 pt-4 border-t border-academy-primary/20">
                  <div className="flex items-center gap-2">
                    <IoDesktop className="text-blue-400" />
                    <span className="text-xs text-gray-500">Windows 10/11</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoLogoApple className="text-gray-400" />
                    <span className="text-xs text-gray-500">macOS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCodeSlash className="text-green-400" />
                    <span className="text-xs text-gray-500">Linux</span>
                  </div>
                </div>
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
            <p className="text-gray-400 max-w-2xl mx-auto">
              By the end of this 16-week program, you'll be able to build for every platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <IoRocket />, title: "Build Full-Stack Web Apps", desc: "Create complete web applications from scratch, both frontend and backend" },
              { icon: <IoPhonePortrait />, title: "Publish Mobile Apps", desc: "Build and deploy iOS & Android apps using React Native" },
              { icon: <IoDesktop />, title: "Create Desktop Applications", desc: "Package web apps as cross-platform desktop software with Electron" },
              { icon: <IoCodeSlash />, title: "Write Clean Code", desc: "Apply industry best practices and write maintainable, scalable code" },
              { icon: <IoGlobe />, title: "Deploy to Production", desc: "Host web apps, submit to app stores, and distribute desktop apps" },
              { icon: <IoDiamond />, title: "Career Ready Portfolio", desc: "Build a portfolio demonstrating real-world projects across all platforms" },
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

      {/* ── Why These Technologies Matter ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Complete Cross-Platform Stack</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              One language. Every platform. Real-world applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <IoGlobe className="text-academy-yellow text-3xl mx-auto mb-2" />
              <p className="text-white font-semibold">Web</p>
              <p className="text-gray-500 text-sm">React / Next.js</p>
            </div>
            <div className="text-center p-4">
              <IoPhonePortrait className="text-academy-yellow text-3xl mx-auto mb-2" />
              <p className="text-white font-semibold">Mobile</p>
              <p className="text-gray-500 text-sm">React Native</p>
            </div>
            <div className="text-center p-4">
              <IoDesktop className="text-academy-yellow text-3xl mx-auto mb-2" />
              <p className="text-white font-semibold">Desktop</p>
              <p className="text-gray-500 text-sm">Electron</p>
            </div>
            <div className="text-center p-4">
              <IoCodeSlash className="text-academy-yellow text-3xl mx-auto mb-2" />
              <p className="text-white font-semibold">Backend</p>
              <p className="text-gray-500 text-sm">Node.js</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 bg-academy-dark border-t border-academy-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Enroll?</h2>
            <p className="text-gray-400">Early bird pricing ends soon — limited seats available.</p>
          </div>
          <div className="max-w-md mx-auto">
            <PricingCardWrapper
              originalPrice={650000}
              discountPrice={450000}
              features={COURSE_PRICING_FEATURES}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
/**
 * These IDs are used to link cohorts to specific course modules.
 * They match the sections in your main Course page.
 */
export const INDIVIDUAL_MODULES = [
  { id: "js-fundamentals", name: "JavaScript Fundamentals", duration: "4 Weeks" },
  { id: "backend-node",    name: "Backend (Node.js/MongoDB)", duration: "4 Weeks" },
  { id: "frontend-react",   name: "Frontend (React/Next.js)", duration: "4 Weeks" },
  { id: "mobile-react",     name: "Mobile (React Native)",    duration: "4 Weeks" },
  { id: "desktop-electron", name: "Desktop (Electron)",       duration: "2 Weeks" },
];

/**
 * Global formatters for currency and strings
 */
export const fmt = {
  // e.g., 450000 -> ₦450,000
  currency: (amount) => 
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount),
    
  // e.g., "fullstack" -> "Fullstack"
  capitalize: (str) => str?.charAt(0).toUpperCase() + str?.slice(1),
};
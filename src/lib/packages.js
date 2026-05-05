export const INDIVIDUAL_MODULES = [
  { id: "js-fundamentals", name: "JavaScript Fundamentals" },
  { id: "backend-node",    name: "Backend (Node.js/MongoDB)" },
  { id: "frontend-react",   name: "Frontend (React/Next.js)" },
  { id: "mobile-react",     name: "Mobile (React Native)" },
  { id: "desktop-electron", name: "Desktop (Electron)" },
];

/**
 * Global formatters
 */
export const fmt = {
  // Formats numbers to Nigerian Naira: 450000 -> ₦450,000
  currency: (amount) => 
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount),

  // Capitalize strings
  capitalize: (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "",
};
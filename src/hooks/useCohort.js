"use client";

import { useEffect, useState } from "react";

/**
 * Returns the next enrollable cohort (upcoming or active, public).
 * Use this in home.jsx, enroll.jsx, course.jsx to drive
 * live start dates, deadlines, and seat counts.
 *
 * Usage:
 *   const { cohort, loading } = useCohort();
 *   cohort?.startDate  → ISO date string
 *   cohort?.seatsRemaining
 *   cohort?.enrollmentDeadline
 */
export function useCohort() {
  const [cohort, setCohort]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetch("/api/cohorts?active=true")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setCohort(json.data[0]); // first upcoming/active cohort
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { cohort, loading, error };
}

/** Format a date string into a readable form e.g. "May 4, 2026" */
export function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** How many days until a date (positive = future, negative = past) */
export function daysUntil(iso) {
  if (!iso) return null;
  const diff = new Date(iso) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
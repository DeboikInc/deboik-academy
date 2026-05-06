"use client";

import { useEffect, useState } from "react";

export function useCohort() {
  const [cohort, setCohort]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetch("/api/cohorts?active=true")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setCohort(json.data[0]);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Derived from the cohort data — no hardcoded dates anywhere
  const isEarlyBird = Boolean(
    cohort && new Date(cohort.enrollmentDeadline) > new Date()
  );

  return { cohort, loading, error, isEarlyBird };
}

export function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function daysUntil(iso) {
  if (!iso) return null;
  const diff = new Date(iso) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
// HOW TO USE useCohort in your public pages
// ─────────────────────────────────────────
// Add this to home.jsx hero section to show live cohort dates.
// Replace the static strings with the dynamic values from the hook.

"use client";
import { useCohort, fmtDate, daysUntil } from "@/hooks/useCohort";
import { IoCalendar, IoTime, IoLocation, IoPeople } from "react-icons/io5";

export default function CohortBanner() {
  const { cohort, loading } = useCohort();

  if (loading) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mt-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-32 bg-academy-primary/20 rounded-full" />
        ))}
      </div>
    );
  }

  if (!cohort) return null;

  const d = daysUntil(cohort.startDate);
  const seatsLeft = (cohort.maxSeats ?? 30) - (cohort.enrolledCount ?? 0);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 mt-8">
      <div className="flex items-center gap-2">
        <IoCalendar className="text-academy-yellow" />
        <span>Starts {fmtDate(cohort.startDate)}</span>
      </div>
      <div className="flex items-center gap-2">
        <IoTime className="text-academy-yellow" />
        <span>16 Weeks (4 Months)</span>
      </div>
      <div className="flex items-center gap-2">
        <IoLocation className="text-academy-yellow" />
        <span className="capitalize">{cohort.classFormat ?? "Hybrid"} Learning</span>
      </div>
      {seatsLeft <= 10 && seatsLeft > 0 && (
        <div className="flex items-center gap-2 text-red-400">
          <IoPeople />
          <span>Only {seatsLeft} seats left!</span>
        </div>
      )}
      {d !== null && d > 0 && cohort.status === "upcoming" && (
        <div className="inline-flex items-center gap-1.5 bg-academy-yellow/10 border border-academy-yellow/30 rounded-full px-3 py-1 text-academy-yellow text-xs font-medium">
          Enrollment closes in {daysUntil(cohort.enrollmentDeadline)} days
        </div>
      )}
    </div>
  );
}

// ─── In home.jsx, replace the static date badges with: ───
// import CohortBanner from "@/components/CohortBanner";
// ...
// <CohortBanner />   ← replaces the static <div> with IoCalendar etc.
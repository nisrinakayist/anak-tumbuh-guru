"use client";

import HabitRecapPage from "@/components/features/habitRecap/HabitRecapPage";

// Backward-compatible wrapper for the legacy wake-up route/component.
// The generic HabitRecapPage now handles Bangun Pagi and all other habits.
export default function WakeUpRecap() {
  return <HabitRecapPage habitId="wake-up" />;
}

"use client";

import useHabitRecap from "@/hook/useHabitRecap";

// Backward-compatible hook kept for older imports.
// The active implementation is now the generic habit recap hook.
export default function useWakeUpRecap() {
  return useHabitRecap("wake-up");
}

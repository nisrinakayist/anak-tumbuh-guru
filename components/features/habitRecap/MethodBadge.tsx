"use client";

import { FiCheckCircle, FiUser } from "react-icons/fi";
import StatusBadge from "@/components/ui/Badge/StatusBadge";
import { HabitMethodTone } from "@/lib/types/habitRecapType";

type MethodBadgeProps = {
  label: string | null;
  tone: HabitMethodTone | null;
};

export default function MethodBadge({ label, tone }: MethodBadgeProps) {
  if (!label || !tone) {
    return <span className="text-primary-900/35">-</span>;
  }

  return (
    <StatusBadge
      label={label}
      tone={tone === "success" ? "success" : "warning"}
      icon={tone === "success" ? FiCheckCircle : FiUser}
    />
  );
}

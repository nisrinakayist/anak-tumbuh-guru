"use client";

import { IconType } from "react-icons";

export type StatusBadgeTone = "success" | "warning" | "muted" | "danger" | "info" | "purple";

type StatusBadgeProps = {
  label: string;
  tone: StatusBadgeTone;
  icon?: IconType;
};

const TONE_CLASS: Record<StatusBadgeTone, string> = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  muted: "bg-slate-100 text-slate-500",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-700",
  purple: "bg-violet-50 text-violet-700",
};

export default function StatusBadge({ label, tone, icon: Icon }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-black ${TONE_CLASS[tone]}`}
    >
      {Icon && <Icon size={12} className="shrink-0" />}
      {label}
    </span>
  );
}

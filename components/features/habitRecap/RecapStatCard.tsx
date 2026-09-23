"use client";

import { IconType } from "react-icons";
import StatusBadge, { StatusBadgeTone } from "@/components/ui/Badge/StatusBadge";

export type RecapStatTone = "orange" | "blue" | "green" | "purple";

type RecapStatCardProps = {
  label: string;
  value: string;
  suffix?: string;
  suffixTone?: "muted" | "accent";
  icon: IconType;
  tone: RecapStatTone;
  badge: { label: string; tone: StatusBadgeTone };
  footer: string;
  footerIcon?: IconType;
};

const TONE_CLASS: Record<RecapStatTone, { box: string; accent: string; dot: string }> = {
  orange: { box: "bg-orange-50 text-orange-500", accent: "text-orange-600", dot: "bg-emerald-500" },
  blue: { box: "bg-blue-50 text-blue-500", accent: "text-blue-600", dot: "bg-blue-500" },
  green: { box: "bg-emerald-50 text-emerald-500", accent: "text-emerald-600", dot: "bg-emerald-500" },
  purple: { box: "bg-violet-50 text-violet-500", accent: "text-violet-600", dot: "bg-violet-500" },
};

export default function RecapStatCard({
  label,
  value,
  suffix,
  suffixTone = "muted",
  icon: Icon,
  tone,
  badge,
  footer,
  footerIcon: FooterIcon,
}: RecapStatCardProps) {
  const toneClass = TONE_CLASS[tone];

  return (
    <div className="min-w-0 rounded-2xl border border-primary-100 bg-white p-3 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 ${toneClass.box}`}>
          <Icon size={20} />
        </span>
        <StatusBadge label={badge.label} tone={badge.tone} />
      </div>

      <p className="mt-3 text-[9px] font-black sm:mt-4 sm:text-[10px] uppercase tracking-[0.14em] text-primary-900/50">{label}</p>

      <p className="mt-1 flex min-w-0 flex-wrap items-baseline gap-x-1 text-2xl font-black sm:gap-x-1.5 sm:text-3xl text-primary-900">
        {value}
        {suffix && (
          <span className={`text-[10px] font-bold sm:text-xs ${suffixTone === "accent" ? toneClass.accent : "text-primary-900/45"}`}>
            {suffix}
          </span>
        )}
      </p>

      <p className="mt-2 flex items-start gap-1 text-[9px] font-semibold leading-tight sm:gap-1.5 sm:text-[11px] text-primary-900/55">
        {FooterIcon ? (
          <FooterIcon size={13} className={`shrink-0 ${toneClass.accent}`} />
        ) : (
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${toneClass.dot}`} />
        )}
        {footer}
      </p>
    </div>
  );
}

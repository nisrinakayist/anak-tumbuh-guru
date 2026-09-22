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
    <div className="rounded-2xl border border-primary-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${toneClass.box}`}>
          <Icon size={20} />
        </span>
        <StatusBadge label={badge.label} tone={badge.tone} />
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.14em] text-primary-900/50">{label}</p>

      <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 text-3xl font-black text-primary-900">
        {value}
        {suffix && (
          <span className={`text-xs font-bold ${suffixTone === "accent" ? toneClass.accent : "text-primary-900/45"}`}>
            {suffix}
          </span>
        )}
      </p>

      <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-primary-900/55">
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

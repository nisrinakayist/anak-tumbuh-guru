"use client";

import { HabitSummaryMetric } from "@/lib/types/habitRecapType";
import { HABIT_ICON_REGISTRY } from "@/lib/constants/habitRecapIcons";
import RecapStatCard from "@/components/features/habitRecap/RecapStatCard";

type RecapStatCardsProps = {
  summary: HabitSummaryMetric[];
};

// Render 4 kartu ringkasan generik; ikon di-resolve dari iconKey (string)
// lewat HABIT_ICON_REGISTRY supaya data ringkasan tetap aman disimpan di Redux.
export default function RecapStatCards({ summary }: RecapStatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {summary.map((metric) => (
        <RecapStatCard
          key={metric.key}
          label={metric.label}
          value={metric.value}
          suffix={metric.suffix}
          suffixTone={metric.suffixAccent ? "accent" : "muted"}
          icon={HABIT_ICON_REGISTRY[metric.iconKey]}
          tone={metric.tone}
          badge={{ label: metric.badgeLabel, tone: metric.badgeTone }}
          footer={metric.footer}
          footerIcon={metric.footerIconKey ? HABIT_ICON_REGISTRY[metric.footerIconKey] : undefined}
        />
      ))}
    </div>
  );
}

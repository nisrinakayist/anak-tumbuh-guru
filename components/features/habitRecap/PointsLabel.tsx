"use client";

import { formatPoints } from "@/lib/utils/habitRecap";

type PointsLabelProps = {
  points: number;
};

export default function PointsLabel({ points }: PointsLabelProps) {
  const toneClass = points >= 20 ? "text-emerald-600" : points > 0 ? "text-amber-600" : "text-primary-900/45";

  return <span className={`whitespace-nowrap text-xs font-black ${toneClass}`}>{formatPoints(points)}</span>;
}

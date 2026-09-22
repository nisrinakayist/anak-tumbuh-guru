"use client";

import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import StatusBadge from "@/components/ui/Badge/StatusBadge";
import { HabitReportStatus } from "@/lib/types/habitRecapType";

type ReportStatusBadgeProps = {
  status: HabitReportStatus;
};

export default function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  const isConfirmed = status === "confirmed";

  return (
    <StatusBadge
      label={isConfirmed ? "Terkonfirmasi Ortu" : "Belum Mengisi"}
      tone={isConfirmed ? "info" : "danger"}
      icon={isConfirmed ? FiCheckCircle : FiAlertCircle}
    />
  );
}

"use client";

import { useState } from "react";
import { CiExport } from "react-icons/ci";
import { ReportFilter } from "@/lib/types/reportType";
import { exportClassroomReportApi } from "@/lib/api/reportApi";
import { isMockEnabled } from "@/lib/utils/mock";

type ExportFormat = "csv" | "pdf";

type ExportReportButtonProps = {
  filter: ReportFilter;
  format: ExportFormat;
  disabled?: boolean;
};

function ExportReportButton({ filter, format, disabled }: ExportReportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (isMockEnabled()) {
      alert(
        `Export ${format.toUpperCase()} tidak tersedia di mode data dummy. Nyalakan backend asli untuk mencoba fitur ini.`
      );
      return;
    }

    setIsExporting(true);
    try {
      const blob = await exportClassroomReportApi(filter, format);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `laporan-rombel-${filter.start_date}-${filter.end_date}.${format}`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={disabled || isExporting}
      title={`Unduh ${format.toUpperCase()}`}
      className="inline-flex items-center gap-1.5 rounded-xl border border-primary-200 px-3 py-2.5 text-xs font-black text-primary-900 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <CiExport size={16} />
      {format.toUpperCase()}
    </button>
  );
}

export default ExportReportButton;

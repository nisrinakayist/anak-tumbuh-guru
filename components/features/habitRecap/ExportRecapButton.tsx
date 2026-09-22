"use client";

import { FiDownload } from "react-icons/fi";
import AccentButton from "@/components/ui/Button/AccentButton";
import { HabitStudentRecord } from "@/lib/types/habitRecapType";
import { buildRecapCsv, downloadTextFile } from "@/lib/utils/habitRecap";

type ExportRecapButtonProps = {
  records: HabitStudentRecord[];
  fileName: string;
  columnLabels: { primary: string; method: string };
};

// Data dummy: rekap diunduh sebagai CSV (bisa langsung dibuka di Excel).
export default function ExportRecapButton({ records, fileName, columnLabels }: ExportRecapButtonProps) {
  const handleExport = () => {
    downloadTextFile(`${fileName}.csv`, buildRecapCsv(records, columnLabels), "text/csv;charset=utf-8");
  };

  return (
    <AccentButton icon={FiDownload} onClick={handleExport} disabled={!records.length} className="w-full sm:w-auto">
      Unduh Rekap Excel
    </AccentButton>
  );
}

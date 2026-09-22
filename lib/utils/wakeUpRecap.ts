import {
  WakeUpSortBy,
  WakeUpStatusFilter,
  WakeUpStudentRecord,
} from "@/lib/types/wakeUpRecapType";
import {
  WAKE_UP_METHOD_LABEL,
  WAKE_UP_REPORT_STATUS_LABEL,
} from "@/lib/constants/wakeUpRecap";

export const filterWakeUpRecords = (
  records: WakeUpStudentRecord[],
  query: string,
  statusFilter: WakeUpStatusFilter
) => {
  const keyword = query.trim().toLowerCase();

  return records.filter((record) => {
    const matchStatus = statusFilter === "all" || record.report_status === statusFilter;
    const matchQuery =
      !keyword ||
      record.name.toLowerCase().includes(keyword) ||
      record.nis.toLowerCase().includes(keyword);
    return matchStatus && matchQuery;
  });
};

export const sortWakeUpRecords = (records: WakeUpStudentRecord[], sortBy: WakeUpSortBy) => {
  const sorted = [...records];

  sorted.sort((a, b) => {
    if (sortBy === "number") return a.id - b.id;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "points") return b.points - a.points || a.name.localeCompare(b.name);

    // wake_time: yang belum tercatat ditaruh paling bawah
    if (a.wake_time === b.wake_time) return a.name.localeCompare(b.name);
    if (a.wake_time === null) return 1;
    if (b.wake_time === null) return -1;
    return a.wake_time.localeCompare(b.wake_time);
  });

  return sorted;
};

export const paginateItems = <T>(items: T[], page: number, pageSize: number) =>
  items.slice((page - 1) * pageSize, page * pageSize);

export const formatPoints = (points: number) => (points > 0 ? `+${points} PTS` : `${points} PTS`);

const escapeCsv = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;

// CSV diberi BOM supaya langsung terbaca rapi saat dibuka di Excel.
export const buildRecapCsv = (records: WakeUpStudentRecord[]) => {
  const header = ["No", "NIS", "Nama Siswa", "Jam Bangun", "Metode Bangun", "Status Laporan", "Poin"];
  const rows = records.map((record, index) => [
    index + 1,
    record.nis,
    record.name,
    record.wake_time ?? "Belum tercatat",
    record.method ? WAKE_UP_METHOD_LABEL[record.method] : "-",
    WAKE_UP_REPORT_STATUS_LABEL[record.report_status],
    record.points,
  ]);

  const body = [header, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\r\n");
  return `\uFEFF${body}`;
};

export const downloadTextFile = (filename: string, content: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

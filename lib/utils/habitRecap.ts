import { HabitSortBy, HabitStatusFilter, HabitStudentRecord } from "@/lib/types/habitRecapType";

export const filterHabitRecords = (
  records: HabitStudentRecord[],
  query: string,
  statusFilter: HabitStatusFilter
) => {
  const keyword = query.trim().toLowerCase();

  return records.filter((record) => {
    const matchStatus = statusFilter === "all" || record.report_status === statusFilter;
    const matchQuery =
      !keyword || record.name.toLowerCase().includes(keyword) || record.nis.toLowerCase().includes(keyword);
    return matchStatus && matchQuery;
  });
};

export const sortHabitRecords = (records: HabitStudentRecord[], sortBy: HabitSortBy) => {
  const sorted = [...records];

  sorted.sort((a, b) => {
    if (sortBy === "number") return a.id - b.id;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "points") return b.points - a.points || a.name.localeCompare(b.name);

    // primary_value: yang belum tercatat ditaruh paling bawah
    if (a.primary_value === b.primary_value) return a.name.localeCompare(b.name);
    if (a.primary_value === null) return 1;
    if (b.primary_value === null) return -1;
    return a.primary_value.localeCompare(b.primary_value);
  });

  return sorted;
};

export const paginateItems = <T>(items: T[], page: number, pageSize: number) =>
  items.slice((page - 1) * pageSize, page * pageSize);

export const formatPoints = (points: number) => (points > 0 ? `+${points} PTS` : `${points} PTS`);

const escapeCsv = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;

// CSV diberi BOM supaya langsung terbaca rapi saat dibuka di Excel.
export const buildRecapCsv = (
  records: HabitStudentRecord[],
  columnLabels: { primary: string; method: string }
) => {
  const header = ["No", "NIS", "Nama Siswa", columnLabels.primary, columnLabels.method, "Status Laporan", "Poin"];
  const rows = records.map((record, index) => [
    index + 1,
    record.nis,
    record.name,
    record.primary_value ?? "Belum tercatat",
    record.method_label ?? "-",
    record.report_status === "confirmed" ? "Terkonfirmasi Ortu" : "Belum Mengisi",
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

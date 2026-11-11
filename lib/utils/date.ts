// Backend menghitung "hari ini" memakai zona Asia/Jakarta, jadi filter
// tanggal di frontend memakai zona yang sama (bukan zona perangkat).
const TIME_ZONE = "Asia/Jakarta";

// Format YYYY-MM-DD (cocok untuk query `date=` di GET /habits/entries).
export const todayInJakarta = (): string =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(new Date());

// Contoh: "Senin, 19 Okt 2026"
export const formatRecordDateLabel = (date = new Date()): string =>
  new Intl.DateTimeFormat("id-ID", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

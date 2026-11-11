// Cache id rombel aktif guru. Hanya dipakai saat OFFLINE (tambah siswa
// diantrekan tanpa bisa menanyakan rombel_id ke server). Saat online, id
// selalu diambil ulang dari GET /dashboard/teacher.
const KEY = "teacher_rombel_id";

export const cacheRombelId = (id: number): void => {
  try {
    window.localStorage.setItem(KEY, String(id));
  } catch {
    // abaikan
  }
};

export const getCachedRombelId = (): number | null => {
  try {
    const raw = window.localStorage.getItem(KEY);
    const id = raw ? Number(raw) : NaN;
    return Number.isInteger(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
};

export const clearCachedRombelId = (): void => {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // abaikan
  }
};

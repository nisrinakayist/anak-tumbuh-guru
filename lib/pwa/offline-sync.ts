import { addStudentApi } from "@/lib/api/studentApi";
import {
  getPendingOfflineRecords,
  markOfflineRecordSynced,
  OfflineRecord,
} from "@/lib/pwa/offline-db";
import { AddStudentPayload } from "@/lib/types/studentType";

export type SyncResult = {
  synced: number;
  failed: number;
};

/**
 * Kirim ulang 1 record offline ke API sesuai "type"-nya.
 *
 * Kalau nanti ada form lain yang mau didukung mode offline (misal isi
 * kebiasaan harian), tinggal tambah `case` baru di sini yang manggil
 * fungsi API terkait, lalu pas nyimpen ke IndexedDB pastikan pakai
 * `type` yang sama (lihat saveOfflineRecord di lib/pwa/offline-db.ts).
 */
async function replayRecord(record: OfflineRecord): Promise<boolean> {
  switch (record.type) {
    case "add_student": {
      const response = await addStudentApi(record.payload as unknown as AddStudentPayload);
      return response.code === 200;
    }

    default:
      console.warn(`[offline-sync] Tidak ada handler untuk tipe: ${record.type}`);
      return false;
  }
}

/**
 * Proses semua record offline yang berstatus "pending".
 * Dipanggil otomatis saat koneksi kembali online (lihat PwaBootstrap.tsx).
 * Aman dipanggil berkali-kali; record yang sudah "synced" tidak diambil lagi.
 */
export async function syncPendingOfflineRecords(): Promise<SyncResult> {
  const result: SyncResult = { synced: 0, failed: 0 };

  if (typeof window === "undefined" || !navigator.onLine) {
    return result;
  }

  let pendingRecords: OfflineRecord[];
  try {
    pendingRecords = await getPendingOfflineRecords();
  } catch (error) {
    console.error("[offline-sync] Gagal membaca antrean offline:", error);
    return result;
  }

  for (const record of pendingRecords) {
    try {
      const success = await replayRecord(record);

      if (success) {
        await markOfflineRecordSynced(record.id);
        result.synced += 1;
      } else {
        result.failed += 1;
      }
    } catch (error) {
      console.error(`[offline-sync] Gagal sinkronisasi record ${record.id}:`, error);
      result.failed += 1;
    }
  }

  return result;
}

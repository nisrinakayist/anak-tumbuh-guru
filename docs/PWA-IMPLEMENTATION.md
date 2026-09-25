# Implementasi PWA Aman - Dashboard Wali Kelas

## Dikerjakan pada tahap frontend

Bagian yang sudah disiapkan tanpa bergantung pada API Backend:

- Web App Manifest
- Service Worker
- Cache resource/page
- Deteksi online/offline
- IndexedDB
- Struktur penyimpanan data offline
- Status `pending` / `synced`
- UI indikator offline

## Bagian yang sengaja belum disambungkan

Bagian berikut menunggu kontrak API Laravel dari Backend:

- Pengiriman queue IndexedDB ke API
- Endpoint dan HTTP method final
- Format JSON request
- Authentication API
- Mapping field FE ke BE
- Penanganan response sukses/gagal
- Duplicate/idempotency
- Aturan insert/update
- Retry/sinkronisasi final

## Catatan teknis

Service Worker tidak mengintersep request `/api/*` pada tahap ini. Tujuannya agar perubahan PWA tidak mengubah perilaku API Backend.

Service Worker didaftarkan hanya pada production mode agar development Next.js tidak terganggu oleh cache lama.

IndexedDB sudah memiliki queue lokal dengan status `pending`. Form bisnis yang mengirim data ke Backend belum diubah untuk menulis ke queue sampai struktur data API disepakati.

## Cara menguji PWA

Karena Service Worker hanya didaftarkan pada production mode:

```bash
npm install
npm run build
npm start
```

Kemudian buka aplikasi melalui `http://localhost:3000`.

Langkah dasar:

1. Buka aplikasi ketika online.
2. Buka beberapa halaman yang ingin tersedia offline.
3. Matikan koneksi internet.
4. Refresh/buka kembali halaman yang sudah pernah dimuat.
5. Indikator offline akan muncul.

> Service Worker dapat berjalan di `localhost`; HTTPS diperlukan ketika aplikasi digunakan di domain non-localhost.

## Yang perlu dikonfirmasi ke Backend

Sebelum membuat sinkronisasi final, minta:

1. Endpoint penyimpanan data habit.
2. HTTP method.
3. Field wajib.
4. Format JSON request.
5. Authentication.
6. Response sukses.
7. Response validasi/error.
8. Sumber ID data (FE/BE).
9. Mekanisme duplicate/idempotency.
10. Aturan insert/update ketika data yang sama dikirim ulang.

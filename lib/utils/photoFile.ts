// Aturan unggah foto siswa (Contract v1.3): jpg/png/webp, maks. 2 MB,
// maks. 4096x4096 px (dimensi diperiksa backend; pelanggaran 422).
export const PHOTO_ACCEPT = "image/jpeg,image/png,image/webp";
export const PHOTO_MAX_BYTES = 2 * 1024 * 1024;

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

// Mengembalikan pesan error, atau null bila berkas boleh diunggah.
export function validatePhotoFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) return "Foto harus berformat JPG, PNG, atau WebP.";
  if (file.size > PHOTO_MAX_BYTES) return "Ukuran foto maksimal 2 MB.";
  return null;
}

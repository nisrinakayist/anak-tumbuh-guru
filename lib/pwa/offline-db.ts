export type OfflineStatus = "pending" | "synced";

export type OfflineRecord = {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  status: OfflineStatus;
  createdAt: string;
  updatedAt: string;
};

const DB_NAME = "anak-tumbuh-guru-offline";
const DB_VERSION = 1;
const STORE_NAME = "offlineQueue";

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const openDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      reject(new Error("IndexedDB tidak tersedia di browser ini."));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });

        store.createIndex("status", "status", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Gagal membuka IndexedDB."));
  });

export const saveOfflineRecord = async (
  type: string,
  payload: Record<string, unknown>
): Promise<OfflineRecord> => {
  const now = new Date().toISOString();

  const record: OfflineRecord = {
    id: createId(),
    type,
    payload,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  const db = await openDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(record);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Gagal menyimpan data offline."));
  });

  db.close();
  return record;
};

export const getPendingOfflineRecords = async (): Promise<OfflineRecord[]> => {
  const db = await openDatabase();

  const records = await new Promise<OfflineRecord[]>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction
      .objectStore(STORE_NAME)
      .index("status")
      .getAll("pending");

    request.onsuccess = () => resolve(request.result as OfflineRecord[]);
    request.onerror = () =>
      reject(request.error ?? new Error("Gagal membaca data offline."));
  });

  db.close();
  return records;
};

export const markOfflineRecordSynced = async (id: string) => {
  const db = await openDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      const record = request.result as OfflineRecord | undefined;

      if (!record) {
        resolve();
        return;
      }

      store.put({
        ...record,
        status: "synced",
        updatedAt: new Date().toISOString(),
      });
    };

    request.onerror = () =>
      reject(request.error ?? new Error("Gagal memperbarui status data."));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Gagal memperbarui data."));
  });

  db.close();
};

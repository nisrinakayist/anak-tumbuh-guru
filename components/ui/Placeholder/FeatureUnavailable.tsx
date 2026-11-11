type FeatureUnavailableProps = {
  title: string;
  description?: string;
};

// Ditampilkan untuk fitur yang endpoint backend-nya belum tersedia, supaya
// tidak ada tombol/form yang seolah menyimpan data padahal tidak terkirim.
function FeatureUnavailable({
  title,
  description = "Fitur ini akan tersedia setelah backend menyediakan endpoint-nya.",
}: FeatureUnavailableProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="w-full max-w-md rounded-[2rem] border border-primary-100 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-black uppercase tracking-wider text-primary-500">Segera Hadir</p>
        <h1 className="mt-2 text-xl font-black text-primary-900">{title}</h1>
        <p className="mt-2 text-sm font-semibold text-primary-900/60">{description}</p>
      </div>
    </div>
  );
}

export default FeatureUnavailable;

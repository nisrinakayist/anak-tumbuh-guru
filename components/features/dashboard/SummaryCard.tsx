import { IconType } from "react-icons";

type SummaryCardProps = {
  label: string;
  value: string | number;
  icon: IconType;
  // compact: padding & ukuran teks lebih kecil di layar sempit -- dipakai saat
  // beberapa kartu harus tetap sejajar (mis. 3 kartu Report Center) meskipun
  // di mobile, bukan tumpuk 1 kolom.
  compact?: boolean;
};

function SummaryCard({ label, value, icon: Icon, compact = false }: SummaryCardProps) {
  return (
    <div
      className={`min-w-0 rounded-2xl border border-primary-100 bg-white shadow-sm ${
        compact ? "p-2 sm:p-5" : "p-4 sm:p-5"
      }`}
    >
      <span
        className={`grid place-items-center rounded-xl bg-primary-50 text-primary-500 ${
          compact ? "h-8 w-8 sm:h-10 sm:w-10" : "h-10 w-10"
        }`}
      >
        <Icon size={compact ? 18 : 20} />
      </span>
      <p
        className={`mt-3 truncate font-bold text-primary-900/55 ${
          compact ? "text-[10px] sm:text-xs" : "text-xs"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1 truncate font-extrabold text-primary-900 ${
          compact ? "text-base sm:text-2xl" : "text-xl sm:text-2xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default SummaryCard;

import { FillStatus } from "@/lib/types/studentType";

type FillStatusBadgeProps = {
  status: FillStatus;
};

function FillStatusBadge({ status }: FillStatusBadgeProps) {
  const isFilled = status === "filled";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${
        isFilled ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {isFilled ? "Sudah mengisi" : "Belum mengisi"}
    </span>
  );
}

export default FillStatusBadge;

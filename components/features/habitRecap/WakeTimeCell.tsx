"use client";

import { FiClock } from "react-icons/fi";
import { WAKE_UP_TIME_NOTE_LABEL } from "@/lib/constants/wakeUpRecap";
import { WakeUpTimeNote } from "@/lib/types/wakeUpRecapType";

type WakeTimeCellProps = {
  time: string | null;
  note: WakeUpTimeNote;
};

const NOTE_CLASS = {
  early: "text-emerald-600",
  on_time: "text-blue-600",
};

export default function WakeTimeCell({ time, note }: WakeTimeCellProps) {
  if (!time) {
    return <span className="text-xs font-semibold text-primary-900/45">Belum tercatat</span>;
  }

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary-100 px-2.5 py-1 text-xs font-black text-primary-900">
        <FiClock size={12} className="text-secondary-500" />
        {time} WIB
      </span>
      {note && <span className={`text-[10px] font-bold ${NOTE_CLASS[note]}`}>({WAKE_UP_TIME_NOTE_LABEL[note]})</span>}
    </div>
  );
}

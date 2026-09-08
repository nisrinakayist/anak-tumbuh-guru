import { ReportFilter, ReportInitiative } from "@/lib/types/reportType";
import { HABIT_OPTIONS } from "@/lib/constants/habit";

type HabitFilterFieldsProps = {
  filter: ReportFilter;
  onHabitChange: (habitId: string) => void;
  onInitiativeToggle: (initiative: ReportInitiative) => void;
};

const inputClass =
  "mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-primary-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20";
const labelClass = "text-xs font-black uppercase tracking-wider text-primary-900";

function HabitFilterFields({ filter, onHabitChange, onInitiativeToggle }: HabitFilterFieldsProps) {
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      <label className={labelClass}>
        Kebiasaan
        <select
          value={filter.habit_id ?? HABIT_OPTIONS[0].id}
          onChange={(event) => onHabitChange(event.target.value)}
          className={inputClass}
        >
          {HABIT_OPTIONS.map((habit) => (
            <option key={habit.id} value={habit.id}>
              {habit.name}
            </option>
          ))}
        </select>
      </label>

      <div>
        <p className={labelClass}>Inisiatif</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["mandiri", "disuruh"] as ReportInitiative[]).map((initiative) => (
            <label
              key={initiative}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-primary-900"
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-primary-500"
                checked={(filter.initiatives ?? []).includes(initiative)}
                onChange={() => onInitiativeToggle(initiative)}
              />
              {initiative === "mandiri" ? "Sadar Sendiri" : "Disuruh"}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HabitFilterFields;

import { HABIT_OPTIONS } from "@/lib/constants/habit";

type HabitTabsProps = {
  activeHabitId: string;
  onChange: (habitId: string) => void;
};

function HabitTabs({ activeHabitId, onChange }: HabitTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-primary-100 pb-3">
      {HABIT_OPTIONS.map((habit) => (
        <button
          key={habit.id}
          type="button"
          onClick={() => onChange(habit.id)}
          className={`rounded-xl px-3.5 py-2 text-xs font-black transition ${
            activeHabitId === habit.id
              ? "bg-primary-500 text-white"
              : "bg-primary-50 text-primary-900/70 hover:bg-primary-100"
          }`}
        >
          {habit.name}
        </button>
      ))}
    </div>
  );
}

export default HabitTabs;

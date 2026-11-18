"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchHabitGuides, saveHabitGuide, clearSaveMessage } from "@/redux/features/habitGuide/habitGuideSlice";
import useClassroomDashboard from "@/hook/useClassroomDashboard";
import { HABIT_OPTIONS } from "@/lib/constants/habit";
import { HABIT_GUIDE_MAX_LENGTH } from "@/lib/types/habitGuideType";
import HabitTabs from "@/components/features/habitGuide/HabitTabs";
import SaveGuideButton from "@/components/features/habitGuide/SaveGuideButton";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

function HabitGuideEditor() {
  const [activeHabitId, setActiveHabitId] = useState<string>(HABIT_OPTIONS[0].id);
  // Hanya menyimpan teks yang sedang diubah per kebiasaan; selebihnya dari store.
  const [edits, setEdits] = useState<Record<string, string>>({});

  const { classGroup } = useClassroomDashboard();
  const dispatch = useDispatch<AppDispatch>();
  const { guides, loading, saving, error, saveMessage } = useSelector(
    (state: RootState) => state.habitGuide
  );

  // Rombel diambil dari sesi Guru yang login (1 Teacher = 1 rombel, dok. bag. 2)
  const classGroupId = classGroup?.id;

  useEffect(() => {
    if (!classGroupId) return;
    dispatch(fetchHabitGuides(classGroupId));
  }, [dispatch, classGroupId]);

  const draft = edits[activeHabitId] ?? guides[activeHabitId] ?? "";

  const handleTabChange = (habitId: string) => {
    dispatch(clearSaveMessage());
    setActiveHabitId(habitId);
  };

  const handleSave = () => {
    if (!classGroupId) return;
    const habitCode = activeHabitId;
    dispatch(saveHabitGuide({ rombelId: classGroupId, habitCode, content: draft })).then((result) => {
      if (saveHabitGuide.fulfilled.match(result)) {
        setEdits((current) => {
          const next = { ...current };
          delete next[habitCode];
          return next;
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary-900/55">Pengaturan Panduan</p>
        <h1 className="mt-1 text-2xl font-extrabold text-primary-900">
          Panduan Pengisian 7 Kebiasaan
        </h1>
        <p className="mt-1 max-w-xl text-sm font-semibold text-primary-900/55">
          Tulis panduan (teks biasa) yang akan ditampilkan ke siswa di rombelmu saat mengisi
          kebiasaan harian. Kosongkan lalu simpan untuk menghapus panduan.
        </p>
      </div>

      <div className="rounded-3xl border border-primary-100 bg-white p-5 shadow-sm">
        <HabitTabs activeHabitId={activeHabitId} onChange={handleTabChange} />

        {error && <ErrorAlert message={error} />}

        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <SpinLoader size={40} />
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <textarea
              value={draft}
              maxLength={HABIT_GUIDE_MAX_LENGTH}
              onChange={(event) =>
                setEdits((current) => ({ ...current, [activeHabitId]: event.target.value }))
              }
              rows={12}
              placeholder="Tulis panduan pengisian untuk kebiasaan ini..."
              className="w-full resize-y rounded-2xl border border-primary-100 p-4 text-sm text-primary-900 outline-none focus:border-primary-500"
            />
            <p className="text-right text-xs font-semibold text-primary-900/55">
              {draft.length}/{HABIT_GUIDE_MAX_LENGTH} karakter. Tag HTML tidak diperbolehkan.
            </p>

            {saveMessage && (
              <p className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
                {saveMessage}
              </p>
            )}

            <div className="flex justify-end">
              <SaveGuideButton isSaving={saving} onClick={handleSave} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HabitGuideEditor;

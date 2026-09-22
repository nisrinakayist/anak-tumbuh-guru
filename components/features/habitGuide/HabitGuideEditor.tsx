"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchHabitGuide, saveHabitGuide, clearSaveMessage } from "@/redux/features/habitGuide/habitGuideSlice";
import useClassroomDashboard from "@/hook/useClassroomDashboard";
import { HABIT_OPTIONS } from "@/lib/constants/habit";
import HabitTabs from "@/components/features/habitGuide/HabitTabs";
import RichTextEditor from "@/components/features/habitGuide/RichTextEditor";
import SaveGuideButton from "@/components/features/habitGuide/SaveGuideButton";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

function HabitGuideEditor() {
  const [activeHabitId, setActiveHabitId] = useState<string>(HABIT_OPTIONS[0].id);
  const [draftHtml, setDraftHtml] = useState("");

  const { classGroup } = useClassroomDashboard();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, saving, error, saveMessage } = useSelector(
    (state: RootState) => state.habitGuide
  );

  // Rombel diambil dari sesi Guru yang login (1 Teacher = 1 rombel, dok. bag. 2)
  const classGroupId = classGroup?.id;

  useEffect(() => {
    if (!classGroupId) return;
    dispatch(clearSaveMessage());
    dispatch(fetchHabitGuide({ habitId: activeHabitId, classGroupId })).then((result) => {
      if (
        fetchHabitGuide.fulfilled.match(result) &&
        result.payload.code === 200 &&
        result.payload.data
      ) {
        setDraftHtml(result.payload.data.content_html);
      }
    });
  }, [dispatch, activeHabitId, classGroupId]);

  const handleSave = () => {
    if (!classGroupId) return;
    dispatch(
      saveHabitGuide({ habit_id: activeHabitId, class_group_id: classGroupId, content_html: draftHtml })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary-900/55">Pengaturan Panduan</p>
        <h1 className="mt-1 text-2xl font-extrabold text-primary-900">
          Panduan Pengisian 7 Kebiasaan
        </h1>
        <p className="mt-1 max-w-xl text-sm font-semibold text-primary-900/55">
          Edit teks panduan yang akan ditampilkan ke siswa di rombelmu saat mengisi kebiasaan
          harian.
        </p>
      </div>

      <div className="rounded-3xl border border-primary-100 bg-white p-5 shadow-sm">
        <HabitTabs activeHabitId={activeHabitId} onChange={setActiveHabitId} />

        {error && <ErrorAlert message={error} />}

        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <SpinLoader size={40} />
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <RichTextEditor value={draftHtml} onChange={setDraftHtml} />

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

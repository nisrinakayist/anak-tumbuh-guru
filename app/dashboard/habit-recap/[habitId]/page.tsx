import { Metadata } from "next";
import { notFound } from "next/navigation";
import HabitRecapPage from "@/components/features/habitRecap/HabitRecapPage";
import { HABIT_RECAP_CONFIG } from "@/lib/constants/habitRecapConfig";
import { HabitId } from "@/lib/types/habitRecapType";

type PageParams = {
  habitId: string;
};

// Next.js App Router terbaru: `params` berupa Promise, wajib di-`await`.
type PageProps = {
  params: Promise<PageParams>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { habitId } = await params;
  const config = HABIT_RECAP_CONFIG[habitId as HabitId];
  return { title: `${config?.label ?? "Rekap Kebiasaan"} | ANAKTUMBUH.ID Wali Kelas` };
}

const Page = async ({ params }: PageProps) => {
  const { habitId } = await params;

  // habitId di luar 7 kebiasaan yang dikenal -> 404 (bukan kebiasaan yang belum
  // ada datanya; itu ditangani ComingSoonCard di dalam HabitRecapPage).
  if (!(habitId in HABIT_RECAP_CONFIG)) {
    notFound();
  }

  return <HabitRecapPage habitId={habitId as HabitId} />;
};

export default Page;

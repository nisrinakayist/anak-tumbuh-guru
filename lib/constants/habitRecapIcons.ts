import { IconType } from "react-icons";
import {
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiPlusCircle,
  FiShield,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { HabitIconKey } from "@/lib/types/habitRecapType";

// Peta kunci ikon (string, aman disimpan di Redux) -> komponen ikon asli.
// Dipakai oleh RecapStatCards supaya data ringkasan tetap serializable.
export const HABIT_ICON_REGISTRY: Record<HabitIconKey, IconType> = {
  shield: FiShield,
  clock: FiClock,
  check: FiCheckCircle,
  award: FiAward,
  calendar: FiCalendar,
  star: FiStar,
  book: FiBookOpen,
  heart: FiHeart,
  trophy: FiAward,
  user: FiUser,
  plus: FiPlusCircle,
};

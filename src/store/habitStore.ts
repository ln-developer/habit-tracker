import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type HabitType, type CategoryType } from "../types/habit.types";

type HabitStore = {
  habits: HabitType[];
  selectedCategory: CategoryType | "all";

  addHabit: (habit: HabitType) => void;
  updateHabit: (id: string, updates: Partial<HabitType>) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (id: string, date: string) => void;
  setSelectedCategory: (category: CategoryType | "all") => void;
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [],
      selectedCategory: "all",

      addHabit: (habit) =>
        set((state) => ({ habits: [...state.habits, habit] })),
      updateHabit: (id, updates) =>
        set((state) => ({
          habits: state.habits.map((v) => {
            if (v.id === id) return { ...v, ...updates };

            return v;
          }),
        })),
      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((v) => v.id !== id),
        })),

      toggleCompletion: (id, date) =>
        set((state) => ({
          habits: state.habits.map((v) => {
            if (v.id !== id) return v;

            const isCompleted = v.completions.includes(date);

            return {
              ...v,
              completions: isCompleted
                ? v.completions.filter((d) => d !== date)
                : [...v.completions, date],
            };
          }),
        })),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
    }),
    { name: "habit-store" },
  ),
);

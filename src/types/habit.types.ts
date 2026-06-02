export const Frequency = {
  Daily: "daily",
  Weekly: "weekly",
  Custom: "custom",
} as const;

export type FrequencyType = (typeof Frequency)[keyof typeof Frequency];

export const Category = {
  Health: "health",
  Learning: "learning",
  Mindfulness: "mindfulness",
  Work: "work",
  Other: "other",
} as const;

export type CategoryType = (typeof Category)[keyof typeof Category];

export type HabitType = {
  id: string;
  name: string;
  emoji: string;
  category: CategoryType;
  frequency: FrequencyType;
  daysOfWeek?: number[];
  createdAt: string;
  completions: string[];
};

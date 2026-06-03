import { useMemo, useState } from "react";
import {
  Category,
  Frequency,
  type CategoryType,
  type FrequencyType,
  type HabitFormState,
} from "../types/habit.types";

import "./HabitForm.css";

type HabitFormProps = {
  habit: HabitFormState | null;
  onSubmit: (form: HabitFormState) => void;
};

const INITIAL_STATE = {
  name: "",
  emoji: "🏃",
  category: Category.Health,
  frequency: Frequency.Daily,
  daysOfWeek: [],
};

const EMOJIS = [
  "🏃",
  "🧘",
  "📚",
  "💪",
  "💧",
  "✍️",
  "🎯",
  "🥗",
  "😴",
  "🎨",
  "🎸",
  "💊",
];

const CATEGORIES: { id: CategoryType; label: string; icon: string }[] = [
  { id: Category.Health, label: "Health", icon: "🏃" },
  { id: Category.Learning, label: "Learning", icon: "📚" },
  { id: Category.Mindfulness, label: "Mindfulness", icon: "🧘" },
  { id: Category.Work, label: "Work", icon: "💼" },
];

const FREQUENCY: { id: FrequencyType; label: string; icon: string }[] = [
  { id: Frequency.Daily, label: "Daily", icon: "📅" },
  { id: Frequency.Weekly, label: "Weekly", icon: "📆" },
  { id: Frequency.Custom, label: "Custom", icon: "🗓" },
];

const DAYS = ["Mo.", "Tu.", "We.", "Th.", "Fr.", "Sa.", "Su."];

export default function HabitForm({ habit = null, onSubmit }: HabitFormProps) {
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [daysOfWeekIsTouched, setDaysOfWeekIsTouched] = useState(false);

  const [formState, setFormState] = useState<HabitFormState>(
    habit ?? INITIAL_STATE,
  );

  const toggleFrequency = (frequency: FrequencyType) => {
    setFormState((prev) => ({
      ...prev,
      frequency,
      daysOfWeek: frequency !== Frequency.Custom ? [] : prev.daysOfWeek,
    }));

    if (frequency !== Frequency.Custom) {
      setDaysOfWeekIsTouched(false);
    }
  };

  const toggleDaysOfWeek = (day: number) => {
    setFormState((prev) => {
      if (prev.daysOfWeek.includes(day))
        return {
          ...prev,
          daysOfWeek: prev.daysOfWeek.filter((i) => i !== day),
        };

      return { ...prev, daysOfWeek: [...prev.daysOfWeek, day] };
    });

    setDaysOfWeekIsTouched(true);
  };

  const formIsValid = useMemo(() => {
    return (
      !!formState.name &&
      !!formState.emoji &&
      !!formState.category &&
      !!formState.frequency &&
      (formState.frequency !== Frequency.Custom ||
        formState.daysOfWeek.length > 0)
    );
  }, [formState]);

  return (
    <div className="form-group">
      <div className="form-control">
        <label className="form-control__label">
          Name <span className="form-control_required">*</span>
        </label>
        <input
          value={formState.name}
          onBlur={() => setNameIsTouched(true)}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, name: event.target.value }))
          }
          required
          className={`form-control__input ${nameIsTouched && formState.name.length === 0 ? "invalid" : ""}`}
        />

        {nameIsTouched && formState.name.length === 0 && (
          <p className="form-control__error">Name is required</p>
        )}
      </div>

      <div className="form-control">
        <label className="form-control__label">
          Emoji <span className="form-control_required">*</span>
        </label>

        <div className="form-control__options">
          {EMOJIS.map((i) => (
            <button
              type="button"
              key={i}
              className={`form-control__option ${formState.emoji === i ? "active" : ""}`}
              onClick={() => setFormState((prev) => ({ ...prev, emoji: i }))}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="form-control">
        <label className="form-control__label">
          Category <span className="form-control_required">*</span>
        </label>

        <div className="form-control__options">
          {CATEGORIES.map((i) => (
            <button
              type="button"
              key={i.id}
              className={`form-control__option ${formState.category === i.id ? "active" : ""}`}
              onClick={() =>
                setFormState((prev) => ({ ...prev, category: i.id }))
              }
            >
              <span>{i.icon}</span>
              <span>{i.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="form-control">
        <label className="form-control__label">
          Frequency <span className="form-control_required">*</span>
        </label>

        <div className="form-control__options">
          {FREQUENCY.map((i) => (
            <button
              type="button"
              key={i.id}
              className={`form-control__option ${formState.frequency === i.id ? "active" : ""}`}
              onClick={() => toggleFrequency(i.id)}
            >
              <span>{i.icon}</span>
              <span>{i.label}</span>
            </button>
          ))}
        </div>
      </div>

      {formState.frequency === Frequency.Custom && (
        <div className="form-control">
          <label className="form-control__label">
            Custom frequency <span className="form-control_required">*</span>
          </label>

          <div className="form-control__days">
            {DAYS.map((i, idx) => (
              <button
                type="button"
                key={i}
                className={`form-control__day ${formState.daysOfWeek.includes(idx) ? "active" : ""}`}
                onClick={() => toggleDaysOfWeek(idx)}
              >
                {i}
              </button>
            ))}
          </div>
          {formState.daysOfWeek.length > 0 && (
            <p className="form-control__selected-days">
              Selected: {formState.daysOfWeek.map((i) => DAYS[i]).join(", ")}
            </p>
          )}

          {daysOfWeekIsTouched && formState.daysOfWeek.length === 0 && (
            <p className="form-control__error">Select at least one day</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={!formIsValid}
        onClick={() => onSubmit(formState)}
        className={`form-group__submit-btn ${habit ? "edit" : ""}`}
      >
        {habit ? "✓ Save changes" : "+ Create habit"}
      </button>
    </div>
  );
}

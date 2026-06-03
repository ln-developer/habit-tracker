import { useState } from "react";

import Modal from "./components/Modal";
import HabitForm from "./components/HabitForm";
import type { HabitFormState, HabitType } from "./types/habit.types";
import { useHabitStore } from "./store/habitStore";

function App() {
  const { addHabit } = useHabitStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (formState: HabitFormState) => {
    const habit: HabitType = {
      ...formState,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completions: [],
    };

    addHabit(habit);
    setIsFormOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsFormOpen(true)}>Open modal</button>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="New habit"
      >
        <HabitForm habit={null} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

export default App;

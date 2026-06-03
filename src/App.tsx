import { useState } from "react";

import Modal from "./components/Modal";
import HabitForm from "./components/HabitForm";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="New habit">
        <HabitForm habit={null} onSubmit={() => {}} />
      </Modal>
    </>
  );
}

export default App;

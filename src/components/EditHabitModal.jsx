import { motion } from "framer-motion";
import { useHabits } from "../context/HabitContext";
import { useState } from "react";

export default function EditHabitModal({ habit, isOpen, onClose, onSave }) {
  const { editHabitName } = useHabits();
  const [editName, setEditName] = useState(habit.name || "");

  const handleSave = () => {
    editHabitName(habit.id, editName);
    onClose();
  };

  const handleCancel = () => {
    setEditName(habit.name || "");
    onClose();
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
       exit={{ scale: 0.9, opacity: 0 }}
      className="modal-backdrop"
      onClick={handleCancel}
    >
      <div className="modal-content">
        <h2>Edit Habit</h2>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Habit name"
          className="habit-input"
          autoFocus
        />
        <div className="modal-actions">
          <button onClick={handleSave} className="btn-primary">
            Save
          </button>
          <button onClick={handleCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

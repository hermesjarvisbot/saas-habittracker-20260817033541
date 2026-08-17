import React, { useState } from "react";
import { useHabits } from "../context/HabitContext";
import { motion } from "framer-motion";

export default function EditHabitModal({ habit, onSave, onCancel }) {
  const [name, setName] = useState(habit ? habit.name : "");
  const handleSave = () => {
    if (name.trim()) {
      onSave();
      onCancel();
    }
  };
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }
      animate={{ scale: 1, opacity: 1 }
      exit={ scale: 0.9, opacity: 0 }
      className="modal-backdrop"
      onClick={onCancel}
    >
      <motion.div
        initial={ y: 20, opacity: 0 }
        animate={ y: 0, opacity: 1 }
        exit={ y: 20, opacity: 0 }
        className="modal-content"
        onClick={e=>e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Edit Habit</h2>
          <button onClick={onCancel} className="close-btn">×</button>
        </div>
        <div className="modal-body">
          <label htmlFor="habit-name">Habit Name</label>
          <input
            type="text"
            id="habit-name"
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Enter habit name"
            className="habit-input"
            autoFocus
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleSave} className="btn-primary">Save</button>
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

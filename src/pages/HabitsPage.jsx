import React, { useState } from "react";
import { useHabits } from "../context/HabitContext";
import { motion } from "framer-motion";
import HabitItem from "../components/HabitItem";
import AddHabitForm from "../components/AddHabitForm";
import EditHabitModal from "../components/EditHabitModal";

export default function HabitsPage() {
  const { habits, addHabit, deleteHabit, editHabitName, clearAllHabits } = useHabits();
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const habitToEdit = habits.find(h => h.id === editingId);
  const handleEditStart = (id, name) => {
    setEditingId(id);
    setEditName(name);
    setShowEditModal(true);
  };
  const handleEditSave = () => {
    if (editName.trim()) {
      editHabitName(editingId, editName.trim());
      setEditingId(null);
      setEditName("");
      setShowEditModal(false);
    }
  };
  const handleEditCancel = () => {
    setEditingId(null);
    setEditName("");
    setShowEditModal(false);
  };
  return (
    <div className="page">
      <h1>My Habits</h1>
      <div className="habits-toolbar">
         <button onClick={()=>{ setEditingId(null); setEditName(""); setShowEditModal(false); }} className="btn-secondary">
          Cancel Edit
        </button>
         <button onClick={()=>{ clearAllHabits(); }} className="btn-danger">
          Clear All
        </button>
      </div>
      <AddHabitForm onAdd={addHabit} />
      <div className="habits-list">
        {habits.map(habit => (
          <motion.key
            key={habit.id}
            initial={ y: 20, opacity: 0 }
            animate={ y: 0, opacity: 1 }
            exit={ y: -20, opacity: 0 }
          >
            <HabitItem
              habit={habit}
              onToggle={(dateStr)=> /* handled via context */ }
              onDelete={()=>deleteHabit(habit.id)}
              onEditStart={handleEditStart}
              editingId={editingId}
              editName={editName}
              onEditSave={handleEditSave}
              onEditCancel={handleEditCancel}
            />
          </motion.key>
        ))}
      </div>
      {showEditModal && (
        <EditHabitModal
          habit={habitToEdit}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

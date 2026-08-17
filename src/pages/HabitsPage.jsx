import React, { useState } from "react";
import { useHabits } from "../context/HabitContext";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function HabitsPage() {
  const { habits, addHabit, toggleHabit, deleteHabit, editHabitName, clearAllHabits } = useHabits();
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHabits = habits.filter(habit =>
    habit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      addHabit(editName.trim());
      setEditName("");
    }
  };

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

  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="page">
      <h1>Habits</h1>
      
      {/* Search and Add Habit */}
      <div className="habits-header">
        <input
          type="text"
          placeholder="Search habits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <form onSubmit={handleAddHabit} className="add-habit-form">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="New habit name"
            className="habit-input"
          />
          <button type="submit" className="btn-primary">
            Add Habit
          </button>
        </form>
      </div>

      {/* Habits List */}
      <div className="habits-list">
        {filteredHabits.length === 0 ? (
          <p className="empty-state">No habits yet. Add one above!</p>
        ) : (
          <>
            {filteredHabits.map(habit => (
              <motion.key
                key={habit.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
              >
                <HabitItem
                  habit={habit}
                  onToggle={(dateStr) => toggleHabit(habit.id, dateStr)}
                  onDelete={() => deleteHabit(habit.id)}
                  onEditStart={() => handleEditStart(habit.id, habit.name)}
                  editingId={editingId}
                  editName={editName}
                  onEditSave={handleEditSave}
                  onEditCancel={handleEditCancel}
                />
              </motion.key>
            ))}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="habits-actions">
        <button
          onClick={() => setShowConfirmClear(true)}
          className={`btn-danger ${showConfirmClear ? "active" : ""}`}
        >
          {showConfirmClear ? "Confirm Clear" : "Clear All"}
        </button>
        {showConfirmClear && (
          <button onClick={() => { clearAllHabits(); setShowConfirmClear(false); }} className="btn-secondary">
            Yes, Clear All
          </button>
        )}
        <button onClick={() => setShowConfirmClear(false)} className="btn-secondary">
          Cancel
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-backdrop" onClick={handleEditCancel}>
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
              <button onClick={handleEditSave} className="btn-primary">
                Save
              </button>
              <button onClick={handleEditCancel} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Confirm Modal */}
      {showConfirmClear && (
        <div className="modal-backdrop" onClick={() => setShowConfirmClear(false)}>
          <div className="modal-content">
            <h2>Clear All Habits</h2>
            <p>Are you sure you want to delete all habits? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => { clearAllHabits(); setShowConfirmClear(false); }} className="btn-danger">
                Yes, Clear All
              </button>
              <button onClick={() => setShowConfirmClear(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HabitItem({ habit, onToggle, onDelete, onEditStart, editingId, editName, onEditSave, onEditCancel }) {
  const { toggleHabit: toggleHabitFn } = useHabits();
  const today = format(new Date(), "yyyy-MM-dd");
  const completedToday = habit.completions.includes(today);
  const isEditing = editingId === habit.id;

  return (
    <div className="habit-item">
      <div className="habit-info">
        <h3>{habit.name}</h3>
        <p className="habit-meta">
          Streak: {calculateStreak(habit.completions)} day{calculateStreak(habit.completions) !== 1 ? "s" : ""} &bull; 
          Created: {format(new Date(habit.createdAt), "PP")}
        </p>
      </div>
      <div className="habit-actions">
        <button
          onClick={() => { toggleHabitFn(habit.id, today); }}
          className={`habit-btn ${completedToday ? "active" : ""}`}
        >
          {completedToday ? "✓" : "○"}
        </button>
        <button onClick={() => onEditStart(habit.id, habit.name)} className="btn-edit">✎</button>
        <button onClick={onDelete} className="btn-delete">🗑</button>
      </div>
    </div>
  );
}

function calculateStreak(completions) {
  if (!completions.length) return 0;
  const sorted = [...completions].sort((a, b) => new Date(a) - new Date(b));
  let streak = 0;
  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  for (let i = sorted.length - 1; i >= 0; i--) {
    const d = new Date(sorted[i]);
    const diff = (today - d) / (1000 * 60 * 60 * 24);
    if (diff === streak) {
      streak++;
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}
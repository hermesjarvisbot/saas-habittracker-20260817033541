import React from "react";
import { useHabits } from "../context/HabitContext";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function HabitItem({ habit, onToggle, onDelete, onEditStart, editingId, editName, onEditSave, onEditCancel }) {
  const { toggleHabit } = useHabits();
  const today = format(new Date(), "yyyy-MM-dd");
  const completedToday = habit.completions.includes(today);
  const streak = calculateStreak(habit.completions);
  const isEditing = editingId === habit.id;
  return (
    <div className="habit-item">
      <div className="habit-info">
        <h3>{habit.name}</h3>
        <p className="habit-meta">
          Streak: {streak} day{streak !== 1 ? "s" : ""} &bull; Created: {format(new Date(habit.createdAt), "PP")}
        </p>
      </div>
      <div className="habit-actions">
        <button
          onClick={()=>{ toggleHabit(habit.id, today); }
          className={`habit-btn ${completedToday ? "active" : ""}`}
        >
          {completedToday ? "✓" : "○"}
        </button>
        <button onClick={()=>onEditStart(habit.id, habit.name)} className="btn-edit">✎</button>
        <button onClick={onDelete} className="btn-delete">🗑</button>
      </div>
    </div>
  );
}
function calculateStreak(completions) {
  if (!completions.length) return 0;
  const sorted = [...completions].sort((a,b)=>new Date(a)-new Date(b));
  let streak = 0;
  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  for (let i = sorted.length-1; i >= 0; i--) {
    const d = new Date(sorted[i]);
    const diff = (today - d) / (1000*60*60*24);
    if (diff === streak) {
      streak++;
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

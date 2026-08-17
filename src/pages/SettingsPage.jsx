import React, { useState } from "react";
import { useHabits } from "../context/HabitContext";

export default function SettingsPage() {
  const { habits, clearAllHabits } = useHabits();
  const [confirmClear, setConfirmClear] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");
  return (
    <div className="page">
      <h1>Settings</h1>
      <div className="settings-section">
        <h2>Appearance</h2>
        <label>
          <input type="checkbox" checked={theme === "dark"} onChange={e=>setTheme(e.target.checked?"dark":"light")} />
          Dark Mode
        </label>
        <button onClick={toggleTheme} className="btn-secondary">Toggle Theme</button>
      </div>
      <div className="settings-section">
        <h2>Data Management</h2>
        <p>
          Your habits are stored locally in your browser. Clearing site data will delete all habits.
        </p>
         <button onClick={()=>{ /* could add import */ }} className="btn-secondary">
          Import Data (JSON)
        </button>
         <button onClick={()=>{ setConfirmClear(true); }} className="btn-danger">
          Clear All Data
        </button>
        {confirmClear && (
          <div className="confirm">
            <p>Are you sure you want to delete all habits? This action cannot be undone.</p>
            <button onClick={()=>{ clearAllHabits(); setConfirmClear(false); } className="btn-danger">
              Yes, Clear All
            </button>
            <button onClick={()=>setConfirmClear(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

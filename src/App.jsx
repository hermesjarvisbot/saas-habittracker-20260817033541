import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HabitsPage from "./pages/HabitsPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ExportPage from "./pages/ExportPage";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");
  return (
    <Router>
      <div className="app" data-theme={theme}>
        <header className="app-header">
          <h1>HabitTracker Pro</h1>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </header>
        <nav className="app-nav">
          <a href="/dashboard" className="{window.location.pathname === '/dashboard' ? 'active' : ''}">Dashboard</a>
          <a href="/habits" className="{window.location.pathname === '/habits' ? 'active' : ''}">Habits</a>
          <a href="/analytics" className="{window.location.pathname === '/analytics' ? 'active' : ''}">Analytics</a>
          <a href="/export" className="{window.location.pathname === '/export' ? 'active' : ''}">Export</a>
          <a href="/settings" className="{window.location.pathname === '/settings' ? 'active' : ''}">Settings</a>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
\n// Working on: Add ability to set a target frequency for habits (daily, weekly, etc.). - 2026-08-17 05:37:23\n// Working on: Implement habit editing inline (instead of modal). - 2026-08-17 05:07:16\n// Working on: Add confirmation dialog before deleting a habit. - 2026-08-17 04:37:08\n// Working on: Improve habit item UI with better hover effects. - 2026-08-17 04:07:00\n// Working on: Add form validation to habit input. - 2026-08-17 03:36:54
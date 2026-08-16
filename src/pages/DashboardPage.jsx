import React from "react";
import {{ useHabits }} from "../context/HabitContext";
import {{ format }} from "date-fns";
import {{ BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer }} from "recharts";

export default function DashboardPage() {{
  const {{ habits }} = useHabits();
  const today = format(new Date(), "yyyy-MM-dd");
  const completedToday = habits.filter(h => h.completions.includes(today)).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
  const last7Days = Array.from({{length: 7}}, (_, i) => {{
    const d = new Date();
    d.setDate(d.getDate() - i);
    return format(d, "yyyy-MM-dd");
  }}).reverse();
  const chartData = last7Days.map(day => {{
    const completed = habits.filter(h => h.completions.includes(day)).length;
    return {{
      day: new Date(day).toLocaleDateString(undefined, {{month:'short', day:'numeric'}}),
      completed,
    };
  }});
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Today's Progress</h3>
          <p>{{completedToday}} / {{totalHabits}} habits completed</p>
        </div>
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <p>{{completionRate.toFixed(1)}}%</p>
        </div>
        <div className="stat-card">
          <h3>Active Habits</h3>
          <p>{{totalHabits}}</p>
        </div>
        <div className="stat-card">
          <h3>Total Completions</h3>
          <p>{{habits.reduce((acc, h)=>acc+h.completions.length, 0)}}</p>
        </div>
      </div>
      <div className="chart-container">
        <h2>Weekly Completion Trend</h2>
        <ResponsiveContainer width="100%" height={{300}}>
          <BarChart data={{chartData}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}};

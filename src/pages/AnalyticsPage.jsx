import React from "react";
import {{ useHabits }} from "../context/HabitContext";
import {{ format }} from "date-fns";
import {{ PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer }} from "recharts";

export default function AnalyticsPage() {{
  const {{ habits }} = useHabits();
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekdayData = Array(7).fill(0);
  habits.forEach(habit => {{
    habit.completions.forEach(dateStr => {{
      const d = new Date(dateStr);
      const day = d.getDay();
      weekdayData[day] += 1;
    }});
  }});
  const pieData = weekdayNames.map((name, idx) => ({{
    name,
    value: weekdayData[idx]
  }})).filter(d=>d.value>0);
  return (
    <div className="page">
      <h1>Analytics</h1>
      <div className="insights">
        <p>Total habits: {{habits.length}}</p>
        <p>Total completions: {{habits.reduce((acc, h)=>acc+h.completions.length, 0)}}</p>
        <p>Most active day: {{weekdayNames[weekdayData.indexOf(Math.max(...weekdayData))]}}</p>
      </div>
      <div className="chart-container">
        <h2>Completion Distribution by Weekday</h2>
        <ResponsiveContainer width="100%" height={{400}}>
          <PieChart>
            <Pie data={{pieData}} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" labelLine={{false}} label={{false}} >
              {{pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={{(idx*10)%360}} />
              ))}}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}};

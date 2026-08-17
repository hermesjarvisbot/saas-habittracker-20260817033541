import React, { useState } from "react";
import { useHabits } from "../context/HabitContext";

export default function ExportPage() {
  const { habits } = useHabits();
  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const generateJSON = () => {
    const data = {
      habits: habits,
      exportedAt: new Date().toISOString()
    };
    setJson(JSON.stringify(data, null, 2));
  };
  const generateCSV = () => {
    const rows = [];
    habits.forEach(habit => {
      habit.completions.forEach(date => {
        rows.push({
          habit: habit.name,
          date: date,
          createdAt: habit.createdAt
        });
      });
    });
    const header = "Habit,Date,Created At";
    const rowsCSV = rows.map(r=>`{r.habit},{r.date},{r.createdAt}`).join("\n");
    setCsv(header + "\n" + rowsCSV);
  };
  const handleDownload = (type) => {
    let data, filename, mime;
    if (type === "json") {
      data = json;
      filename = `habits-export-${new Date().toISOString().slice(0,10)}.json`;
      mime = "application/json";
    } else {
      data = csv;
      filename = `habits-export-${new Date().toISOString().slice(0,10)}.csv`;
      mime = "text/csv";
    }
    const blob = new Blob([data], {type: mime});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="page">
      <h1>Export Data</h1>
      <div className="export-controls">
        <button onClick={generateJSON} disabled={isExporting} className="btn-secondary">
          {isExporting ? "Generating..." : "Generate JSON"}
        </button>
        <button onClick={generateCSV} disabled={isExporting} className="btn-secondary">
          {isExporting ? "Generating..." : "Generate CSV"}
        </button>
      </div>
      {json && (
        <div className="export-preview">
          <h3>JSON Preview</h3>
          <pre className="json-preview">{json.slice(0,500)}{json.length>500?"...":""}</pre>
          <button onClick={()=>handleDownload("json")} className="btn-primary">Download JSON</button>
        </div>
      )}
      {csv && (
        <div className="export-preview">
           <h3>CSV Preview</h3>
                       <pre className="csv-preview">{csv.slice(0,500)}{csv.length>500?"...":""}</pre>
                       <button onClick={()=>handleDownload("csv")} className="btn-primary">Download CSV</button>
                     </div>
                   )
                 });
               };

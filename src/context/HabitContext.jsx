import {{ createContext, useContext, useState, useEffect }} from "react";
import {{ v4 as uuidv4 }} from "uuid";

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

export const HabitsProvider = {{ children }} => {{
  const [habits, setHabits] = useState(() => {{
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  }});
  useEffect(() => {{
    localStorage.setItem("habits", JSON.stringify(habits));
  }}, [habits]);
  const addHabit = (name) => {{
    const newHabit = {{
      id: uuidv4(),
      name: name,
      createdAt: Date.now(),
      completions: []
    }};
    setHabits(prev => [...prev, newHabit]);
  }};
  const toggleHabit = (id, dateString) => {{
    setHabits(prev => prev.map(h => {{
      if (h.id !== id) return h;
      const idx = h.completions.indexOf(dateString);
      if (idx >= 0) {{
        const newCompletions = [...h.completions];
        newCompletions.splice(idx, 1);
        return {{ ...h, completions: newCompletions }};
      }} else {{
        return {{ ...h, completions: [...h.completions, dateString] }};
      }}
    }}));
  }};
  const deleteHabit = (id) => {{
    setHabits(prev => prev.filter(h => h.id !== id));
  }};
  const editHabitName = (id, newName) => {{
    setHabits(prev => prev.map(h => h.id === id ? {{ ...h, name: newName }} : h)));
  }};
  const clearAllHabits = () => {{
    setHabits([]);
  }};
  return (
    <HabitsContext value={{ habits, addHabit, toggleHabit, deleteHabit, editHabitName, clearAllHabits }}>
      {{children}}
    </HabitsContext>
  );
}};

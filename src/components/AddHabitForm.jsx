import React, {{ useState }} from "react";
import {{ useHabits }} from "../context/HabitContext";

export default function AddHabitForm({{ onAdd }}) {{{{ const {{ addHabit }} = useHabits();
  const [name, setName] = useState("");
  const handleSubmit = (e) => {{
    e.preventDefault();
    if (name.trim()) {{
      addHabit(name.trim());
      setName("");
    }}
  }};
  return (
    <form onSubmit={{handleSubmit}} className="add-habit-form">
      <input
        type="text"
        placeholder="Add a new habit..."
        value={{name}}
        onChange={{e=>setName(e.target.value)}}
        required
        className="habit-input"
      />
      <button type="submit" className="btn-primary">Add Habit</button>
    </form>
  );}}}

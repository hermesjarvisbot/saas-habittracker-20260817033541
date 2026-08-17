import React, { createContext, useContext, useState } from "react";

const HabitsContext = createContext();

export function useHabits() {
  return useContext(HabitsContext);
}

export const HabitsProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now() + Math.random(),
      name,
      completions: [],
      createdAt: new Date().toISOString(),
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const toggleHabit = (id, date) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === id
          ? {
              ...h,
              completions: h.completions.includes(date)
                ? h.completions.filter(d => d !== date)
                : [...h.completions, date]
            }
          : h
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const editHabitName = (id, newName) => {
    setHabits(prev =>
      prev.map(h => h.id === id ? { ...h, name: newName } : h)
    );
  };

  const clearAllHabits = () => {
    setHabits([]);
  };

  return (
    <HabitsContext
      value={{
        habits,
        addHabit,
        toggleHabit,
        deleteHabit,
        editHabitName,
        clearAllHabits,
      }}
    >
      {children}
    </HabitsContext>
  );
};

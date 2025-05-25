
import React, { createContext, useContext, useState } from 'react';

const IntakeContext = createContext();

export function IntakeProvider({ children }) {
  const [intake, setIntake] = useState([]);

  function addToIntake(product) {
    setIntake(prev => [...prev, product]);
  }

  function clearIntake() {
    setIntake([]);
  }

  const totals = intake.reduce(
    (acc, item) => ({
      kcal: acc.kcal + (item.kcal ?? 0),
      protein: acc.protein + (item.protein ?? 0),
      fat: acc.fat + (item.fat ?? 0),
      carbs: acc.carbs + (item.carbs ?? 0),
    }),
    { kcal: 0, protein: 0, fat: 0, carbs: 0 }
  );

  return (
    <IntakeContext.Provider value={{ intake, addToIntake, clearIntake, totals }}>
      {children}
    </IntakeContext.Provider>
  );
}

export function useIntake() {
  return useContext(IntakeContext);
}

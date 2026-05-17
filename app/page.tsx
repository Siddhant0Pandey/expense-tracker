"use client";

import { useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleExpenseCreated() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Expense Tracker</h1>

      <ExpenseForm onExpenseCreated={handleExpenseCreated} />

      <ExpenseList refreshKey={refreshKey} />
    </main>
  );
}
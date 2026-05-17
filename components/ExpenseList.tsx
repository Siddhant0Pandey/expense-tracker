"use client";

import type { Expense } from "@/types/expense";

import { useEffect, useState } from "react";

export default function ExpenseList({
  refreshKey,
}: {
  refreshKey: number;
}) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        setLoading(true);

        const response = await fetch("/api/expenses");
        const data = await response.json();

        console.log(data);

        
        setExpenses(Array.isArray(data) ? data : data.expenses || []);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchExpenses();
  }, [refreshKey]);

  async function deleteExpense(id: string) {
    try {
      await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });

      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  }

  if (loading) return <p>Loading...</p>;

  if (expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 font-semibold">
        Total: Rs. {total}
      </div>

      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <h3 className="font-semibold">{expense.title}</h3>
            <p className="text-sm text-gray-500">
              {expense.category}
            </p>
            <p>Rs. {expense.amount}</p>
          </div>

          <button
            onClick={() => deleteExpense(expense._id!)}
            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
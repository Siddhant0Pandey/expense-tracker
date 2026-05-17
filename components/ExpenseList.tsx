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

        setExpenses(
          Array.isArray(data)
            ? data
            : data.expenses || []
        );
      } catch (error) {
        console.error(
          "Failed to fetch expenses:",
          error
        );

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
      console.error(
        "Failed to delete expense:",
        error
      );
    }
  }

  if (loading)
    return (
      <p className="text-center text-slate-400">
        Loading expenses...
      </p>
    );

  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
        No expenses found.
      </div>
    );
  }

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="space-y-5 mt-10">
      <h1 className="text-2xl font-bold text-white">Expense List</h1>
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 p-5 shadow-lg backdrop-blur">
        <p className="text-sm text-slate-300">
          Total Spending
        </p>

        <h2 className="mt-1 text-3xl font-bold text-white">
          Rs. {total}
        </h2>
      </div>

      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg transition hover:border-emerald-500/30 hover:shadow-emerald-500/10"
        >
          <div>
            <h3 className="text-lg font-semibold text-white bg-emerald-500 text-center px-2 rounded-md inline-block">
              {expense.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {expense.category}
            </p>

            <p className="mt-2 text-xl font-bold text-emerald-400">
              Rs. {expense.amount}
            </p>
          </div>

          <button
            onClick={() =>
              deleteExpense(expense._id!)
            }
            className="rounded-xl bg-red-500/90 px-4 py-2 font-medium text-white transition hover:bg-red-600 active:scale-[0.97]"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
"use client";

import { useState } from "react";

interface ExpenseFormProps {
  onExpenseCreated: () => void;
}

export default function ExpenseForm({
  onExpenseCreated,
}: ExpenseFormProps) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [notes, setNotes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        title,
        amount: Number(amount),
        category,
        date,
        notes,
      }),
    });

    if (response.ok) {
      setTitle("");
      setAmount("");
      setCategory("Food");

      setDate(new Date().toISOString().split("T")[0]);

      setNotes("");

      onExpenseCreated();

      setLoading(false);
    }
  }

  return (
    <form
      className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-2xl font-bold text-white">
          Add Expense
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Track your daily spending effortlessly
        </p>
      </div>

      <input
        type="text"
        placeholder="Expense title"
        className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Rent</option>
        <option>Utilities</option>
        <option>Entertainment</option>
        <option>Other</option>
      </select>

      <input
        type="date"
        className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="min-h-[120px] w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600 active:scale-[0.98]"
      >
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}
"use client";

import { useState } from "react";

export default function ExpenseForm() {
    const[loading,setLoading] =useState(false)
    const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

    function handleSubmit(e:React.FormEvent){
e.preventDefault();
setLoading(true);
    }
  return (
    <form className="space-y-4 rounded border p-4"
    onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Expense title"
        className="w-full border p-2 rounded"
        required
        value={title}
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full border p-2 rounded"
        required
        value={amount}
      />
      <select className="w-full border p-2 rounded bg-gray-900" value={category}>
        <option>Food</option>
        <option>Transport</option>
        <option>Rent</option>
        <option>Utilities</option>
        <option>Entertainment</option>
        <option>Other</option>
      </select>
      <input 
      type="date"
      className="w-full border p-2 rounded"
      value={date}/>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{loading?"Saving...":"Add Expense"}</button>
    </form>
  );
}

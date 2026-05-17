"use client";

import { useState } from "react";


interface ExpenseFormProps {
  onExpenseCreated: () => void;
}

export default function ExpenseForm({
  onExpenseCreated,
}: ExpenseFormProps) {
    const[loading,setLoading] =useState(false)
    const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const[notes,setNotes]= useState("")

   async function handleSubmit(e:React.FormEvent){
e.preventDefault();
setLoading(true);
const response = await fetch("/api/expenses",{
    method:"POST",
    headers:{
        "Content-type":"application/json",
    },
    body:JSON.stringify({
        title,
        amount:Number(amount),
        category,
        date,notes
    })
});
if(response.ok){
    setTitle('');
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
    onExpenseCreated();
    
}
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
        onChange={(e)=>setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full border p-2 rounded"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select className="w-full border p-2 rounded bg-gray-900" value={category}
      onChange={(e) => setCategory(e.target.value)}>
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
      value={date}
              onChange={(e) => setDate(e.target.value)}
/>
  <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{loading?"Saving...":"Add Expense"}</button>
    </form>
  );
}

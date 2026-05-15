import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";

export async function GET(
    request:Request,{params}:{params:Promise<{id:string}>}
){
    await connectDB();
    const {id} = await params;
    const expense = await Expense.findById(id);
    return NextResponse.json(expense);
}

export async function PUT(request:Request,{params}:{params:Promise<{id:string}>} ){
await connectDB();
const {id} = await params;
const body = await request.json();

const updated = await Expense.findByIdAndUpdate(id,body,{
    new:true,
    runValidators:true,
});
return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  await Expense.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted successfully" });
}
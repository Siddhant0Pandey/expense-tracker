import {NextResponse} from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Expense from '@/models/Expense'

export async function GET(){
    try{
        await connectDB();
        const expenses = await Expense.find().sort({date:-1});
        return NextResponse.json(expenses);
    }catch(error){
        return NextResponse.json(
            {message:"Failed to fetch expenses"},
            {status:500}
        )
    }
}

export async function POST(request:Request){
    try{
        await connectDB();
        const body = await request.json();
        const expense = await Expense.create(body);
        return NextResponse.json(expense,{status:201});
    }catch(error){
        return NextResponse.json(
            {
                message:"Failed to create expesnses"
            },
            {status:500}
        )
    }
}
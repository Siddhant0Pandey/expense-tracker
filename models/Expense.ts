import mongoose,{Schema,models,model} from "mongoose";

const ExpenseSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        amount:{
            type:Number,
            requried:true,
            min:0
        },
        category:{
            type:String,
            requried:true,
            trim:true
        },
        date:{
            type:Date,
            required:true,
            default:Date.now,
        },
        notes:{
            type:String,
            default:""
        }
    },
    {timestamps:true}
);

const Expense = models.Expense || model ("Expense", ExpenseSchema);
export default Expense
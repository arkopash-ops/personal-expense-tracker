import mongoose, { Schema, Document, Types } from "mongoose";
import type { Iexpense } from "../types/expense.types.js";
import { Category } from "../types/category.type.js";

export interface ExpenseDocument extends Iexpense, Document { }

const expenseSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "user", required: true },
    amount: { type: Number, required: true },
    category: {
        type: String,
        enum: Object.values(Category),
        default: Category.OTHERS
    },
    note: { type: String },
    date: { type: String, required: true }
}, { timestamps: true });

expenseSchema.index({ userId: 1, date: 1 });

const Expense = mongoose.model<ExpenseDocument>("expense", expenseSchema);
export default Expense;

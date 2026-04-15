import mongoose, { Schema, Document, Types } from "mongoose";
import type { Ibudget } from "../types/budget.types.js";
import { Category } from "../types/category.type.js";

export interface BudgetDocument extends Ibudget, Document { }

const budgetSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "user", required: true },
    category: {
        type: String,
        enum: Object.values(Category),
        default: Category.OTHERS,
    },
    month: { type: String, required: true },
    limit: { type: Number, required: true },
}, { timestamps: true });

budgetSchema.index(
    { userId: 1, category: 1, month: 1 },
    { unique: true }
);

const Budget = mongoose.model<BudgetDocument>("budget", budgetSchema);
export default Budget;

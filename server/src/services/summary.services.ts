import mongoose from "mongoose";
import Budget from "../model/budget.model.js";
import Expense from "../model/expense.model.js";
import { Category } from "../types/category.type.js";

export const getSummary = async (userId: string, month: string) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId");
    }

    const UserId = new mongoose.Types.ObjectId(userId);

    const expenses = await Expense.aggregate([
        {
            $match: {
                userId: UserId,
                date: { $regex: `^${month}` }
            }
        },
        {
            $group: {
                _id: "$category",
                totalSpend: { $sum: "$amount" }
            }
        }
    ]);

    const budgets = await Budget.find({ userId: UserId, month });

    const expenseMap = new Map<string, number>();
    expenses.forEach(e => expenseMap.set(e._id, e.totalSpend));

    const summary = Object.values(Category).map(category => {
        const budget = budgets.find(b => b.category === category);
        const spend = expenseMap.get(category) || 0;

        const limit = budget?.limit || 0;

        return {
            category,
            budget: limit,
            spend,
            remaining: limit - spend
        };
    });

    return summary;
};

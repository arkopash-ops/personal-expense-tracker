import Expense, { type ExpenseDocument } from "../model/expense.model.js";
import type { Iexpense } from "../types/expense.types.js";

// get all expense
export const getAllExpenses = async (userId: string) => {
    const expenseList = await Expense.find({userId});
    return expenseList;
};


// create expense
export const createExpense = async (
    data: Iexpense
): Promise<ExpenseDocument> => {
    const expense = await Expense.create(data);
    return expense;
};


// update expense
export const updateExpense = async (
    id: string,
    data: Partial<Iexpense>
): Promise<ExpenseDocument> => {
    const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );

    if (!updatedExpense) {
        const err = new Error("Expense not found or no fields provided.");
        (err as any).statusCode = 400;
        throw err;
    }

    return updatedExpense;
};


//delete expense
export const deleteExpense = async (
    id: string
) => {
    const deleted = await Expense.findByIdAndDelete(id);

    if (!deleted) {
        const err = new Error("Expense not found.");
        (err as any).statusCode = 404;
        throw err;
    }
};

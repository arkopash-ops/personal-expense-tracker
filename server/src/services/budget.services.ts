import type { BudgetDocument } from "../model/budget.model.js";
import Budget from "../model/budget.model.js";
import type { Ibudget } from "../types/budget.types.js";

// get all budget
export const getAllBudget = async () => {
    const budgetList = await Budget.find();
    return budgetList;
};


// create budget
export const createBudget = async (
    data: Ibudget
): Promise<BudgetDocument> => {
    const budget = await Budget.create(data);
    return budget;
}


// update budget
export const updateBudget = async (
    id: string,
    data: Partial<Ibudget>
): Promise<BudgetDocument> => {
    const updatedBudget = await Budget.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );

    if (!updatedBudget) {
        const err = new Error("Budget not found or no fields provided.");
        (err as any).statusCode = 400;
        throw err;
    }

    return updatedBudget;
};

// delete budget
export const deleteBudget = async (
    id: string
) => {
    const deleted = await Budget.findByIdAndDelete(id);

    if (!deleted) {
        const err = new Error("Budget not found.");
        (err as any).statusCode = 404;
        throw err;
    }
};

import type { Request, Response, NextFunction } from "express";
import * as expenseService from "../services/expense.services.js";

// get all expenses
export const _getAllExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const expenses = await expenseService.getAllExpenses(userId);
        res.status(200).json({
            success: true,
            data: expenses,
        });
    } catch (err) {
        next(err);
    }
};


// create expense
export const _createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        const data = { ...req.body, userId };

        const expense = await expenseService.createExpense(data);
        res.status(201).json({
            success: true,
            data: expense,
        });
    } catch (err) {
        next(err);
    }
};


// update expense
export const _updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ success: false, message: "Invalid or missing id." });
        }

        const updatedExpense = await expenseService.updateExpense(id, req.body);

        res.status(200).json({
            success: true,
            data: updatedExpense,
        });
    } catch (err) {
        next(err);
    }
};


// delete expense
export const _deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ success: false, message: "Invalid or missing id." });
        }

        await expenseService.deleteExpense(id);

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

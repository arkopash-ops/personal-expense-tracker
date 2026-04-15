import type { Request, Response, NextFunction } from "express";
import * as budgetService from "../services/budget.services.js"

// get all budget
export const _getAllBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const budget = await budgetService.getAllBudget();
        res.status(200).json({
            success: true,
            data: budget,
        });
    } catch (err) {
        next(err);
    }
};


// create budget
export const _createBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        const data = { ...req.body, user: userId };

        const budget = await budgetService.createBudget(data);
        res.status(201).json({
            success: true,
            data: budget,
        });
    } catch (err) {
        next(err);
    }
};


// update budget
export const _updateBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ success: false, message: "Invalid or missing id." });
        }

        const updatedBudget = await budgetService.updateBudget(id, req.body);

        res.status(200).json({
            success: true,
            data: updatedBudget,
        });
    } catch (err) {
        next(err);
    }
};


// delete budget
export const _deleteBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ success: false, message: "Invalid or missing id." });
        }

        await budgetService.deleteBudget(id);

        res.status(200).json({
            success: true,
            message: "Budget deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

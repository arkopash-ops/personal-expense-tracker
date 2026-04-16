import type { NextFunction, Request, Response } from "express";
import { getSummary } from "../services/summary.services.js";

export const _getSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { month } = req.query;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!month || typeof month !== "string") {
            return res.status(400).json({ message: "month is required (YYYY-MM)" });
        }

        const data = await getSummary(userId, month);

        return res.status(200).json({
            success: true,
            month,
            data
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

import type { Request, Response, NextFunction } from "express";
import type { Schema } from "joi";


export const validate =
    (schema: Schema) =>
        (req: Request, res: Response, next: NextFunction) => {
            const { error } = schema.validate(req.body);
            if (error) {
                const msg = error.details?.[0]?.message || "Validation failed";
                return res.status(400).json({
                    success: false,
                    msg
                });
            }

            next();
        };

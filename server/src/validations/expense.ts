import Joi from "joi";

export const expenseSchema = Joi.object({
    userId: Joi.string(),

    amount: Joi.number()
        .required(),

    category: Joi.string()
        .valid("food", "fransport", "bills", "shopping", "other")
        .default("other"),

    note: Joi.string(),

    date: Joi.date()
        .required(),
});

import Joi from "joi";

export const budgetSchema = Joi.object({
    userId: Joi.string(),

    category: Joi.string()
        .valid("food", "fransport", "bills", "shopping", "other")
        .default("other"),

    month: Joi.string()
        .required(),

    limit: Joi.number()
        .required(),
});

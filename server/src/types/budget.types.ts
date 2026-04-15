import type { Types } from "mongoose";
import type { Category } from "./category.type.js";

export interface Ibudget {
    userId: Types.ObjectId;
    category: Category;
    month: string;
    limit: number;
}

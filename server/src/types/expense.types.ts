import type { Types } from "mongoose";
import type { Category } from "./category.type.js";

export interface Iexpense {
    userId: Types.ObjectId;
    amount: number;
    category: Category;
    note?: string;
    date: string;
}

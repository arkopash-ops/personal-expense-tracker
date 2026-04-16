import type { Category } from "./category";

export interface Expense {
    _id: string;
    userId: string;
    amount: number;
    category: Category;
    note?: string;
    date: string;
}

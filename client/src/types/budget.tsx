import type { Category } from "./category";

export interface Budget {
  _id: string;
  userId: string;
  category: Category;
  month: string;
  limit: number;
}

import { Model } from "mongoose";

export type TCategory =
  | "Fiction"
  | "Science"
  | "SelfDevelopment"
  | "Poetry"
  | "Religious";

export type TBook = {
  _id?: string;
  title: string;
  author: string;
  price: number;
  category: TCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};

export interface BookModel extends Model<TBook> {
  isBookExists(id: string): Promise<TBook | null>;
}

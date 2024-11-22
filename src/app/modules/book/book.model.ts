import { Schema, model } from "mongoose";
import { BookModel, TBook } from "./book.interface";

const bookSchema = new Schema<TBook, BookModel>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

// Custom static method
bookSchema.statics.isBookExists = async function (id: string) {
  const existingBook = await this.findById(id);
  return existingBook;
};

export const Book = model<TBook, BookModel>("Book", bookSchema);

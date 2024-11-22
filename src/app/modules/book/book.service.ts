import { TBook } from "./book.interface";
import { Book } from "./book.model";

// create a book into db
const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);
  return result;
};

export const BookServices = {
  createBookIntoDB,
};

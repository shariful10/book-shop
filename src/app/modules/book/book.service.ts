import { TBook } from "./book.interface";
import { Book } from "./book.model";

// create a book
const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);
  return result;
};

// Get all books
// const getAllBooksFromDB = async () => {
//   const result = await Book.find();
//   return result;
// };

const getAllBooksFromDB = async (searchTerm?: string) => {
  const query = searchTerm
    ? {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { author: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      }
    : {};

  const result = await Book.find(query);
  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
};

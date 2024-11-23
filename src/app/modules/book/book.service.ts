import { TBook } from "./book.interface";
import { Book } from "./book.model";

// create a book
const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);
  return result;
};

// Get all books
const getAllBooksFromDB = async (searchTerm: string) => {
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

// Get a specific book
const getSingleBookFromDB = async (id: string): Promise<TBook | null> => {
  const book = await Book.findById(id);
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
};

// Update a book
const updateBookIntoDB = async (
  id: string,
  updateData: Partial<TBook>,
): Promise<TBook | null> => {
  const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedBook) {
    throw new Error("Book not found");
  }
  return updatedBook;
};

// Delete a book
const deleteBookFromDB = async (id: string): Promise<TBook | null> => {
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw new Error("Book not found");
  }
  return deletedBook;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};

import { Request, Response } from "express";
import { BookServices } from "./book.service";
import { bookValidationSchema } from "./book.validation";

// Create a book
const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;

    const zodParseData = bookValidationSchema.parse(bookData);

    const result = await BookServices.createBookIntoDB(zodParseData);

    res.status(200).json({
      message: "Book created successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: err,
    });
  }
};

// Get all books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.getAllBooksFromDB();

    res.status(200).json({
      message: "Books retrieved successfully",
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Book not found",
      success: false,
      error: err,
    });
  }
};

export const BookController = {
  createBook,
  getAllBooks,
};

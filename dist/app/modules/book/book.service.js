"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServices = void 0;
const book_model_1 = require("./book.model");
// create a book
const createBookIntoDB = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(bookData);
    return result;
});
// Get all books
const getAllBooksFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const query = searchTerm
        ? {
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { author: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
            ],
        }
        : {};
    const result = yield book_model_1.Book.find(query);
    return result;
});
// Get single book
const getSingleBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new Error("Book not found");
    }
    return book;
});
const updateBookIntoDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.Book.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    if (!updatedBook) {
        throw new Error("Book not found");
    }
    return updatedBook;
});
exports.BookServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    getSingleBookFromDB,
    updateBookIntoDB,
};

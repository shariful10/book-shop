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
exports.BookController = void 0;
const zod_1 = require("zod");
const book_service_1 = require("./book.service");
const book_validation_1 = require("./book.validation");
// Create a book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const zodParseData = book_validation_1.bookValidationSchema.parse(bookData);
        const result = yield book_service_1.BookServices.createBookIntoDB(zodParseData);
        res.status(200).json({
            message: "Book created successfully",
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const formattedErrors = err.issues.reduce((acc, issue) => {
                acc[issue.path[0]] = {
                    message: issue.message,
                    name: "ZodError",
                    properties: {
                        message: issue.message,
                        type: issue.code,
                        min: 0,
                    },
                    kind: issue.code,
                    path: issue.path[0],
                };
                return acc;
            }, {});
            res.status(500).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "ZodError",
                    errors: formattedErrors,
                },
                stack: err.stack,
            });
        }
        else {
            res.status(500).json({
                message: "Something went wrong",
                success: false,
                error: err,
            });
        }
    }
});
// Get all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield book_service_1.BookServices.getAllBooksFromDB(searchTerm);
        res.status(200).json({
            message: "Books retrieved successfully",
            status: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Book not found",
            success: false,
            error: err,
        });
    }
});
exports.BookController = {
    createBook,
    getAllBooks,
};

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
exports.OrderServices = void 0;
const book_model_1 = require("../book/book.model");
const order_model_1 = require("./order.model");
// Create order and update stock & quantity
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield order_model_1.Order.startSession();
    session.startTransaction();
    try {
        const book = yield book_model_1.Book.findById(orderData.product).session(session);
        if (!book) {
            throw new Error("Book not found");
        }
        if (book.quantity < orderData.quantity) {
            throw new Error("Insufficient stock");
        }
        book.quantity -= orderData.quantity;
        if (book.quantity === 0) {
            book.inStock = false;
        }
        yield book.save({ session });
        const order = new order_model_1.Order(orderData);
        const result = yield order.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// Calculate total revenue
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_model_1.Order.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "product",
                foreignField: "_id",
                as: "bookDetails",
            },
        },
        {
            $unwind: "$bookDetails",
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: {
                        $multiply: ["$bookDetails.price", "$quantity"],
                    },
                },
            },
        },
    ]);
    return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
});
exports.OrderServices = {
    createOrderIntoDB,
    calculateTotalRevenue,
};

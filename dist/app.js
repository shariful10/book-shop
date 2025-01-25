"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_route_1 = require("./app/modules/book/book.route");
const order_route_1 = require("./app/modules/order/order.route");
const user_route_1 = require("./app/modules/user/user.route");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application routes
app.use("/api/products", book_route_1.BookRoutes);
app.use("/api/orders", order_route_1.OrderRoutes);
app.use("/api/users", user_route_1.UserRoutes);
app.get("/", (req, res) => {
    res.send(`<div style="background: black; border-radius: 15px; width: 700px; height: 200px; margin: auto; margin-top: 50px; display: flex; flex-direction: column; justify-content: center; align-items: center;"><h1 style="color: white; text-align: center;">Welcome to the server of Book Shop!</h1></div>`);
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;

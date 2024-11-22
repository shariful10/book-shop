"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_route_1 = require("./app/modules/book/book.route");
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application routes
app.use("/api", book_route_1.BookRoutes);
app.get("/", (req, res) => {
    res.send(`<div style="background: black; border-radius: 15px; width: 700px; height: 200px; margin: auto; margin-top: 50px; display: flex; flex-direction: column; justify-content: center; align-items: center;"><h1 style="color: white; text-align: center;">Welcome to the server of Book Shop!</h1></div>`);
});
exports.default = app;

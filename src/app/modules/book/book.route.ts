import express from "express";
import { BookController } from "./book.controller";

const router = express.Router();

router.post("/products", BookController.createBook);
router.get("/products", BookController.getAllBooks);
router.get("/products/:productId", BookController.getSingleBook);
router.put("/products/:productId", BookController.updateBook);

export const BookRoutes = router;

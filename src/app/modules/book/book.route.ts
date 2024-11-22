import express from "express";
import { BookController } from "./book.controller";

const router = express.Router();

router.post("/products", BookController.createBook);
router.get("/products", BookController.getAllBooks);

export const BookRoutes = router;

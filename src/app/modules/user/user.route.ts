import express from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserValidations.CreateUserValidationSchema),
  userController.createUser,
);

export const UserRoutes = router;

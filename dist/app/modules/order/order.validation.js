"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// const objectIdSchema = z
//   .string()
//   .regex(/^[a-f\d]{24}$/i, "Invalid ObjectId")
//   .transform((val) => new Types.ObjectId(val));
// const isObjectId = (value: unknown): value is Types.ObjectId => {
//   return Types.ObjectId.isValid(value as Types.ObjectId);
// };
// const objectIdSchema = z.custom<Types.ObjectId>(isObjectId, {
//   message: "Invalid ObjectId",
// });
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email("Email must be in email format")
        .trim(),
    product: zod_1.z.custom((val) => mongoose_1.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
    }),
    quantity: zod_1.z
        .number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
    })
        .int()
        .min(1, "Quantity must be at least 1"),
    totalPrice: zod_1.z
        .number({
        required_error: "Total price is required",
        invalid_type_error: "Total price must be a number",
    })
        .min(0, "Total price must be non-negative"),
});

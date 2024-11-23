import { Book } from "../book/book.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

// Create order and update stock & quantity
const createOrderIntoDB = async (orderData: TOrder): Promise<TOrder> => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(orderData.product).session(session);

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

    await book.save({ session });

    const order = new Order(orderData);
    const result = await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Calculate total revenue
const calculateTotalRevenue = async (): Promise<number> => {
  const result = await Order.aggregate([
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

  return result[0]?.totalRevenue || 0;
};

export const OrderServices = {
  createOrderIntoDB,
  calculateTotalRevenue,
};

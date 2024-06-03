import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Food Processing" },
    payment: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);

export default Order;

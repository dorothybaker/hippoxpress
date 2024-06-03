import Stripe from "stripe";
import Order from "../models/order.model.js";
import { config } from "dotenv";

config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const { items, amount } = req.body;
  const userId = req.user._id;

  const frontend_url = "http://localhost:8000";

  try {
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 1.2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/success`,
      cancel_url: `${frontend_url}/cart`,
    });

    const newOrder = new Order({ items, amount, user: userId });
    await newOrder.save();
    res.status(200).json(session.url);
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const userOrders = async (req, res) => {
  const userId = req.user._id;

  try {
    await Order.updateMany({ user: userId }, { payment: true });

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

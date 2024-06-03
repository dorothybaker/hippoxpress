import { Router } from "express";
import { protectRoute } from "../utils/protectRoute.js";
import { placeOrder, userOrders } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/place", protectRoute, placeOrder);
orderRouter.get("/user", protectRoute, userOrders);

export default orderRouter;

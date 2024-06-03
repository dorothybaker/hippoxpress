import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectToDB } from "./utils/connectToDB.js";
import foodRouter from "./routes/food.route.js";
import authRouter from "./routes/auth.route.js";
import orderRouter from "./routes/order.route.js";

config();

const APP = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

APP.use(express.json());
APP.use(cookieParser());
APP.use(cors({ credentials: true }));

APP.use("/api/food", foodRouter);
APP.use("/api/auth", authRouter);
APP.use("/api/order", orderRouter);

APP.use(express.static(path.join(__dirname, "/client/dist")));

APP.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

APP.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});

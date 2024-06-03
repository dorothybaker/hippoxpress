import { Router } from "express";
import { createFood, getFoods } from "../controllers/food.controller.js";

const foodRouter = Router();

// foodRouter.post("/create", createFood);

foodRouter.get("/list", getFoods);

export default foodRouter;

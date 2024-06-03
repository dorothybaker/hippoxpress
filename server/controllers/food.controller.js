import Food from "../models/food.model.js";

export const createFood = async (req, res) => {
  const { name, description, price, image, category } = req.body;

  try {
    const newFood = new Food({ name, description, price, image, category });

    if (newFood) {
      await newFood.save();

      res.status(201).json(newFood);
    } else {
      res.status(400).json("Invalid food data entered!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();

    if (foods) {
      res.status(200).json(foods);
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

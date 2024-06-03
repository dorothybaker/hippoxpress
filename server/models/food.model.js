import { Schema, model } from "mongoose";

const FoodSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Food = model("Food", FoodSchema);

export default Food;

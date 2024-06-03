import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      cart: { foodList: [] },
      addFood: (data) =>
        set((state) => {
          const existingFood = state.cart.foodList.find(
            (food) => food._id === data._id
          );
          if (existingFood) {
            const updatedFood = state.cart.foodList.map((food) =>
              food._id === data._id
                ? { ...food, quantity: food.quantity + data.quantity }
                : food
            );
            return { cart: { foodList: updatedFood } };
          } else {
            return {
              cart: { foodList: [...state.cart.foodList, { ...data }] },
            };
          }
        }),
      removeFood: (id) =>
        set((state) => ({
          cart: {
            foodList: state.cart.foodList.filter((food) => !(food._id === id)),
          },
        })),
      getPizzas: () => get().cart.foodList,
      resetCart: () => set(() => ({ cart: { foodList: [] } })),
    }),
    { name: "food-storage" }
  )
);

import { useStore } from "../zustand/store";

import { GoTrash } from "react-icons/go";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import { API } from "../utils/makeRequest";

function Cart() {
  const cart = useStore((state) => state.cart.foodList);
  const removeFromCart = useStore((state) => state.removeFood);

  const total = () => {
    return cart.reduce((a, b) => a + b.quantity * b.price, 0);
  };

  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/order/place", {
          items: cart,
          amount: total(),
        });

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data) {
        window.location.replace(data);
      }
    },
  });

  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-7 flex flex-col gap-10">
      {cart.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 py-5">
          {cart.map((item) => (
            <div key={item._id} className="flex flex-col gap-1">
              <div>
                <img
                  src={item.image}
                  alt=""
                  className="h-[230px] w-full object-cover rounded-2xl"
                />
              </div>
              <div className="px-2 flex flex-col gap-1">
                <span className="text-lg font-semibold line-clamp-1">
                  {item.name}
                </span>
                <div className="flex items-center justify-between font-semibold">
                  <span>
                    <span className="text-[15px] text-[#49557e]">Total:</span> ${" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <span>
                    <span className="text-[15px] text-[#49557e]">Qty:</span>{" "}
                    {item.quantity}
                  </span>
                  <button onClick={() => removeFromCart(item._id)}>
                    <GoTrash size={20} color="red" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full min-h-[350px] w-full flex items-center justify-center py-6 sm:text-4xl text-center text-3xl text-gray-400">
          No items in your food cart
        </div>
      )}

      {cart.length > 0 && (
        <div className="flex items-start justify-between lg:gap-10 gap-5 md:flex-row flex-col-reverse">
          <div className="flex-1 flex flex-col gap-3 w-full">
            <h3 className="text-lg">Cart summary</h3>
            <div className="flex flex-col gap-2 divide-y divide-gray-300">
              <div className="flex items-center justify-between w-full px-2">
                <span>Sub total</span>
                <span className="text-lg font-semibold">
                  $ {total().toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between w-full px-2 pt-2">
                <span>Delivery Fee</span>
                <span className="text-lg font-semibold">$ 1.2</span>
              </div>
              <div className="flex items-center justify-between w-full px-2 pt-2">
                <span>Total</span>
                <span className="text-lg font-semibold">
                  $ {(total() + 1.2).toFixed(2)}
                </span>
              </div>
            </div>
            {user ? (
              <button
                className="py-2 px-5 text-white bg-primary rounded-sm h-11 flex items-center justify-center"
                onClick={() => mutate()}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader size={"md"} type="dots" color="white" />
                ) : (
                  "Proceed to checkout"
                )}
              </button>
            ) : (
              <button className="py-2 px-5 text-white bg-primary rounded-sm">
                Sign in to proceed
              </button>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-2 w-full">
            <h1>If you have a promo code, enter it here!</h1>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Promo code"
                className="w-full outline-none bg-slate-200 px-3 h-11"
              />
              <button className="text-sm text-white h-11 px-5 bg-black">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;

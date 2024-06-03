import { IoAdd } from "react-icons/io5";
import { useStore } from "../zustand/store";
import toast from "react-hot-toast";

function Card({ food }) {
  const addToCart = useStore((state) => state.addFood);

  const addtoCartFood = { ...food, quantity: 1 };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <img
          src={food.image}
          alt=""
          className="rounded-xl lg:h-[230px] md:h-[290px] h-[250px] w-full object-cover"
        />

        <button
          className="absolute bottom-3 right-3 bg-green-200 h-7 w-7 flex items-center justify-center rounded-full text-green-900"
          onClick={() => {
            addToCart(addtoCartFood);
            toast.success("Item successfully added to cart!");
          }}
        >
          <IoAdd size={18} />
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-lg">{food.name}</p>
          <p className="text-primary text-lg">
            &#9733;&#9733;&#9733;&#9733;&#9734;
          </p>
        </div>
        <p className="text-sm line-clamp-2 text-gray-500">{food.description}</p>
        <span className="text-primary font-semibold text-xl number">
          $ {food.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default Card;

import { useEffect } from "react";
import { useStore } from "../zustand/store";

import Confetti from "react-confetti";
import { IoCheckmarkDone } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Success() {
  const resetCart = useStore((state) => state.resetCart);

  useEffect(() => {
    resetCart();
  });

  const navigate = useNavigate();
  return (
    <section className="min-h-[450px] flex items-center justify-center text-center flex-col gap-1 px-4">
      <Confetti />
      <IoCheckmarkDone fontSize={100} className="text-primary" />
      <h1 className="text-2xl">Thank you for your purchase!</h1>
      <p className="text-[#49557e]">
        Our team will contact you soon about your order details through your
        email.
      </p>
      <span className="text-primary">Hippoxpress wishes you a nice day!</span>
      <button
        className="text-white bg-primary h-10 fex items-center justify-center px-5"
        onClick={() => {
          navigate("/orders");
        }}
      >
        View your order
      </button>
    </section>
  );
}

export default Success;

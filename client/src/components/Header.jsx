import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../zustand/store";
import { useState } from "react";
import Signinmodal from "./auth/Signinmodal";
import Signupmodal from "./auth/Signupmodal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";

function Header() {
  const cart = useStore((state) => state.cart.foodList);

  const [signin, setSignin] = useState(false);
  const [signup, setSignup] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await API.get("/auth/me");

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: signout, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/auth/signout", {});

        if (res.status === 200) {
          const data = res.data;

          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data) {
        window.location.reload();
        navigate("/");
      }
    },
  });

  return (
    <header className="shadow-md">
      <div className="flex items-center justify-between gap-3 p-4 max-w-7xl mx-auto w-full">
        <h1 className="text-primary text-xl">
          <Link to="/">Hippoxpress</Link>
        </h1>
        <ul className="flex items-center sm:gap-4 gap-3  text-[#49557e] whitespace-nowrap">
          <li className="cursor-pointer md:block hidden">Home</li>
          <li className="cursor-pointer md:block hidden">Our Menu</li>
          {user ? (
            <li className="cursor-pointer" onClick={() => navigate("/orders")}>
              Orders
            </li>
          ) : (
            <li className="cursor-pointer sm:block hidden">Contact us</li>
          )}
          <li className="cursor-pointer">
            <Link to="/cart">
              Cart (<span className="w-2">{cart.length}</span>)
            </Link>
          </li>
          {user ? (
            <li
              className="cursor-pointer text-blue-500"
              onClick={signout}
              aria-disabled={isPending}
            >
              Sign out
            </li>
          ) : (
            <li
              className="cursor-pointer text-blue-500"
              onClick={() => setSignin(true)}
            >
              Sign in
            </li>
          )}
        </ul>
      </div>

      <Signinmodal open={signin} setOpen={setSignin} setSignup={setSignup} />
      <Signupmodal open={signup} setOpen={setSignup} setSignin={setSignin} />
    </header>
  );
}

export default Header;

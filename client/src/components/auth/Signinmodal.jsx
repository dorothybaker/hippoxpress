import { Loader, Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { API } from "../../utils/makeRequest";
import toast from "react-hot-toast";

function Signinmodal({ open, setOpen, setSignup }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const { mutate: signin, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await API.post("/auth/signin", {
          email,
          password,
        });

        if (res.status === 200) {
          const data = res.data;

          setError("");
          setFormData({
            email: "",
            password: "",
          });

          return data;
        }
      } catch (error) {
        setError(error.response.data);
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });

        toast.success("Successfully signed in!");
        setOpen(false);
      }
    },
  });

  const handleSignin = () => {
    setError("");
    signin(formData);
  };

  return (
    <Modal opened={open} onClose={setOpen} centered title="Welcome Back!">
      <section className="flex flex-col gap-3">
        <div className="flex flex-col">
          <h2 className="text-xl">Sign in</h2>
          <span>to continue to Hippoxpress</span>
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignin();
          }}
        >
          <input
            type="email"
            placeholder="Email address"
            className="h-11 w-full outline-none bg-slate-200 rounded-sm px-3 placeholder:text-gray-500"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="h-11 w-full outline-none bg-slate-200 rounded-sm px-3 placeholder:text-gray-500"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="text-white bg-primary h-11 rounded-sm flex items-center justify-center"
            disabled={isPending}
          >
            {isPending ? (
              <Loader size={"md"} color="white" type="dots" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <span className="text-[15px] text-[#49557e]">
          You don't have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => {
              setOpen(false);
              setSignup(true);
            }}
          >
            Sign up!
          </span>
        </span>
      </section>
    </Modal>
  );
}

export default Signinmodal;

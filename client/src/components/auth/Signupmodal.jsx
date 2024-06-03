import { Loader, Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { API } from "../../utils/makeRequest";
import toast from "react-hot-toast";

function Signupmodal({ open, setOpen, setSignin }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: async ({ fullName, email, password }) => {
      try {
        const res = await API.post("/auth/signup", {
          fullName,
          email,
          password,
        });

        if (res.status === 201) {
          const data = res.data;

          setError("");
          setFormData({
            fullName: "",
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

        toast.success("Successfully signed up!");
        setOpen(false);
      }
    },
  });

  const handleSignup = () => {
    if (formData.password.length < 7) {
      setError("Password must be atleast 7 characters long!");
      return;
    }

    setError("");
    signup(formData);
  };

  return (
    <Modal
      opened={open}
      onClose={setOpen}
      centered
      title="Welcome to Hippoxpress!"
    >
      <section className="flex flex-col gap-3">
        <div className="flex flex-col">
          <h2 className="text-xl">Sign up</h2>
          <span>to continue to Hippoxpress</span>
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            className="h-11 w-full outline-none bg-slate-200 rounded-sm px-3 placeholder:text-gray-500"
            required
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
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
              "Sign up"
            )}
          </button>
        </form>
        <span className="text-[15px] text-[#49557e]">
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => {
              setOpen(false);
              setSignin(true);
            }}
          >
            Sign in!
          </span>
        </span>
      </section>
    </Modal>
  );
}

export default Signupmodal;

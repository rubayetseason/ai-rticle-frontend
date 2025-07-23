"use client";

import { Separator } from "@/components/ui/separator";
import {
  LoginFormData,
  loginSchema,
  SignupFormData,
  signupSchema,
} from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BaseLoader from "@/components/loaders/BaseLoader";
import SignupForm from "./_components/SignupForm";
import LoginForm from "./_components/LoginForm";
import { signupUser } from "@/services/auth.service";
import { toast } from "sonner";

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleForm = () => {
    setIsSignUp((p) => !p);
    loginForm.reset();
    signupForm.reset();
  };

  function handleLoginSubmit(data: LoginFormData) {
    console.log("Login submitted:", data);
  }

  async function handleSignupSubmit(data: SignupFormData) {
    try {
      const res = await signupUser(data);

      console.log("res", res);

      if (res?.id) {
        toast.success("Signup successful!");
        signupForm.reset();
        window.location.href = "/posts";
      } else {
        toast.error(res?.message || "Signup failed.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.message ||
        "Signup failed due to an unknown error.";
      toast.error(message);
    }
  }

  return (
    <div>
      <BaseLoader></BaseLoader>
      <div className="px-4 w-full h-screen font-raleway flex flex-col md:flex-row justify-center items-center gap-10">
        {/* left logo */}
        <div className="w-full h-full hidden md:block bg-black dark:bg-white md:w-1/2"></div>

        {/* right panel */}
        <div className="w-full md:w-1/2 min-h-[500px]">
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="w-3/4 mx-auto space-y-6"
              >
                <h1 className="text-2xl md:text-5xl font-semibold text-center">
                  Sign Up
                </h1>

                <SignupForm form={signupForm} onSubmit={handleSignupSubmit} />

                <div className="my-5 md:my-11 w-1/2 mx-auto">
                  <Separator />
                </div>

                <p className="text-center mt-6">
                  Already have an account?{" "}
                  <span
                    onClick={toggleForm}
                    className="underline text-indigo-950 dark:text-white font-semibold cursor-pointer"
                  >
                    Sign In
                  </span>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="w-3/4 mx-auto space-y-6"
              >
                <h1 className="text-2xl md:text-5xl font-semibold text-center">
                  Welcome to AI-rticle.
                </h1>

                <LoginForm form={loginForm} onSubmit={handleLoginSubmit} />

                <div className="my-5 md:my-11 w-1/2 mx-auto">
                  <Separator />
                </div>
                <p className="text-center">
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={toggleForm}
                    className="underline text-indigo-950 dark:text-white font-semibold cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

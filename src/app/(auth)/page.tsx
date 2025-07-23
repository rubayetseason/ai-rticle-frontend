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
import { FcGoogle } from "react-icons/fc";
import AuthThemedLogo from "./_components/AuthThemedLogo";
import LoginForm from "./_components/LoginForm";
import SignupForm from "./_components/SignupForm";
import BaseLoader from "@/components/loaders/BaseLoader";

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

  function handleSignupSubmit(data: SignupFormData) {
    console.log("Signup submitted:", data);
  }

  return (
    <div>
      <BaseLoader></BaseLoader>
      <div className="px-4 max-w-[var(--custom-width)] mx-auto w-full h-screen font-raleway flex flex-col md:flex-row justify-center items-center gap-10">
        {/* left logo */}
        <div className="w-full md:w-1/2">
          <AuthThemedLogo></AuthThemedLogo>
        </div>

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
                className="w-3/4 md:w-full mx-auto space-y-6"
              >
                <h1 className="text-2xl md:text-5xl font-semibold text-center">
                  Sign Up
                </h1>

                <SignupForm form={signupForm} onSubmit={handleSignupSubmit} />

                <div className="my-5 md:my-11 w-1/2 mx-auto">
                  <Separator />
                </div>

                <div className="w-full md:w-1/2 mx-auto">
                  <button
                    type="button"
                    className="px-2 py-2.5 w-full bg-black dark:bg-gray-200 text-white dark:text-black flex justify-center items-center gap-3 transition hover:brightness-110"
                    onClick={() => console.log("Google OAuth (signup)")}
                  >
                    <FcGoogle />
                    Continue With Google
                  </button>
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
                className="w-3/4 md:w-full mx-auto space-y-6"
              >
                <h1 className="text-2xl md:text-5xl font-semibold text-center">
                  Welcome to MindInk.
                </h1>

                <LoginForm form={loginForm} onSubmit={handleLoginSubmit} />

                <div className="my-5 md:my-11 w-1/2 mx-auto">
                  <Separator />
                </div>
                <div className="w-full md:w-1/2 mx-auto">
                  <button
                    type="button"
                    className="px-2 py-2.5 w-full bg-black dark:bg-gray-200 text-white dark:text-black flex justify-center items-center gap-3 transition hover:brightness-110"
                    onClick={() => console.log("Google OAuth (login)")}
                  >
                    <FcGoogle />
                    Continue With Google
                  </button>
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
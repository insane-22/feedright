import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FeaturesSectionDemo } from "@/components/featuresSection";
import { useUser } from "@/context/UserContext";
import { toast, ToastContainer } from "react-toastify";

export const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection navigate={navigate} />
      <FeaturesSectionDemo />
    </div>
  );
};

const HeroSection = ({ navigate }) => {
  const { user } = useUser();

  return (
    <div className="relative my-10 flex mx-5 flex-col items-center justify-center">
      <ToastContainer />
      <Navbar navigate={navigate} />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Effortless Feedback Collection for Teams"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.08,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Create beautiful forms, collect responses, and analyze results — all
          in a few clicks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {user ? (
            <>
              <button
                className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </button>
              <button
                className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900"
                onClick={() => navigate("/create")}
              >
                Create New Form
              </button>
            </>
          ) : (
            <button
              className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              onClick={() => navigate("/login")}
            >
              Login to Get Started
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Navbar = ({ navigate }) => {
  const { user, logoutUser } = useUser();

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">FeedRight</h1>
      </div>
      <div className="flex gap-4">
        {user ? (
          <>
            <button
              className="transform rounded-lg bg-black px-6 py-2 text-white transition-all hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="transform rounded-lg border border-gray-300  px-6 py-2 text-black transition-all hover:-translate-y-0.5 hover:bg-red-800 dark:border-gray-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-800"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="transform rounded-lg bg-black px-6 py-2 text-white transition-all hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Homepage;

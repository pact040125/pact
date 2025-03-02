import { motion } from "framer-motion";
import { LogOut, Users } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.png?url";

export default function Navigation() {
  const user = localStorage.getItem("user");
  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-md fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.img
              src={logo}
              alt="Logo"
              className="w-32 h-32"
            />
            <nav className="hidden md:flex space-x-8">
              {["Home", "Roadmaps", "Live sessions", "Interviews", "Quiz", "Q&As", "About"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replaceAll(" ", "")}`}
                    className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
            {!user ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-200"
                >
                  Sign in
                </Link>
              </motion.div>
            ) : (
              <motion.div className="flex gap-8">
                <Link to="/dashboard">
                  <Users />
                </Link>
                <Link to="/login">
                  <LogOut onClick={() => localStorage.clear()} />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </header>
      <div className=" my-16"></div>
    </>
  );
}

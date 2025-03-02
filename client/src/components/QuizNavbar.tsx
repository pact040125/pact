import React from "react";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { _admin } from "../services/user";

export default function Navbar() {
  const navigate = useNavigate();
  const isAdmin = _admin;

  const handleBackToAdmin = () => {
    navigate("/quiz/admin");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              QuizMaster
            </span>
          </div>

          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToAdmin}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
            >
              Create new Quiz
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

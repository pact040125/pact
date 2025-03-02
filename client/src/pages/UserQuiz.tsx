import { Question, Quiz } from "../types";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/QuizNavbar";
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import apiService from "../services/api";

function UserQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await apiService.getQuizes();
        if (res.data.length > 0) {
          setQuizzes(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);
  if (loading) {
    return (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-[calc(100vh-4rem)]"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </motion.div>
      </>
    );
  }
  if (quizzes.length === 0) {
    return (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50"
        >
          <div className="text-center max-w-lg px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-indigo-100"
            >
              <Clock className="h-12 w-12 text-indigo-600" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-3xl font-extrabold text-gray-900"
            >
              No Active Quiz
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 text-lg text-gray-500"
            >
              The quiz hasn't started yet. Please wait for the administrator to
              set up the questions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Return to Dashboard
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto space-y-8 p-4"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900">Quiz Time!</h1>
          <p className="mt-2 text-gray-600">Select a quiz to start</p>
        </motion.div>
        <AnimatePresence>
          {quizzes.map((quiz, quizIndex) => (
            <motion.div
              key={quiz._id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ delay: quizIndex * 0.1 }}
              className="bg-white shadow-lg rounded-2xl p-4 transition-transform transform hover:scale-105 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {quizIndex + 1}. {quiz.title}
                </h3>
                <p className="text-gray-700 mb-1">
                  📋 Questions: {quiz.questionsLength}
                </p>
                <p className="text-gray-500 mb-4">
                  👤 Created by: {quiz.createdBy}
                </p>
              </div>
              <Link
                to={{
                  pathname: `/quiz/${encodeURIComponent(quiz.title)}`,
                }}
                state={{ quizId: quiz._id }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                Take Quiz →
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default UserQuiz;
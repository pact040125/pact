import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/QuizNavbar";
import { Question } from "../types";
import apiService from "../services/api";
import { useLocation  } from "react-router-dom";

export default function Quiz() {
  const location = useLocation();
  const _id = location.state?.quizId;
  const [currentAnswers, setCurrentAnswers] = useState<{
    [key: string]: number;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Omit<Question, "correct_answer">[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onBackToAdmin = () => {};

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = apiService.getQuizQuestions(Object(_id));
        response.then((res)=> {
            console.log(res.data);
            setQuestions(res.data);
        })        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = apiService.getQuizResults(currentAnswers, _id);
    response.then((res)=> {
        console.log(res.data);
    })
    setIsSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto p-6"
      >
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-4 text-2xl font-semibold text-red-600">
              Error Loading Quiz
            </h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        ) : isSubmitted ? (
          <div className="text-center py-12">
            <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Quiz Submitted Successfully!
            </h2>
            <p className="mt-2 text-gray-600">Thank you for participating.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Take Another Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Quiz Time! 🧠
              </h1>
              <p className="text-gray-600">
                Answer all questions and submit your responses.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {questions.map((question, questionIndex) => (
                  <motion.div
                    key={question._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: questionIndex * 0.1 }}
                    className="bg-white shadow-md rounded-lg p-6 border"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          question.difficulty === "easy"
                            ? "bg-green-100 text-green-800"
                            : question.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {question.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        {question.category}
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        {question.points} pts
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {questionIndex + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <motion.label
                          key={optionIndex}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center p-3 border rounded-lg transition-colors duration-150 cursor-pointer hover:bg-gray-50 ${
                            currentAnswers[question._id] === optionIndex
                              ? "bg-indigo-100 border-indigo-500"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={optionIndex}
                            onChange={() =>
                              setCurrentAnswers({
                                ...currentAnswers,
                                [question._id]: optionIndex,
                              })
                            }
                            required
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <span className="ml-3 text-gray-700">{option}</span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Submit Quiz
                </motion.button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </>
  );
}
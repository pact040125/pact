import React, { useState } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Question } from "../types";
import apiService from "../services/api";
import Navbar from "../components/QuizNavbar";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -50, opacity: 0 },
};

const modalVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
};

function QuizAdmin() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Question>({
    _id: "",
    question: "",
    options: ["", "", "", ""],
    correct_answer: 0,
    points: 1,
    difficulty: "medium",
    category: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizCreator, setQuizCreator] = useState("");
  const handleSaveQuestion = () => {
    if (
      !formData.question ||
      formData.options.some((opt) => !opt) ||
      !formData.category
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (isEditingQuestion && editingId) {
      setQuestions(
        questions.map((q) =>
          q._id === editingId ? { ...q, ...formData, _id: editingId } : q
        )
      );
    } else {
      const newQuestion: Question = {
        ...formData,
        _id: Date.now().toString(),
      };
      setQuestions([...questions, newQuestion]);
    }

    setIsAddingQuestion(false);
    setIsEditingQuestion(false);
    setEditingId(null);
    setFormData({
      _id: "",
      question: "",
      options: ["", "", "", ""],
      correct_answer: 0,
      points: 1,
      difficulty: "medium",
      category: "",
    });
  };

  const handleEditQuestion = (question: Question) => {
    setFormData(question);
    setEditingId(question._id);
    setIsEditingQuestion(true);
    setIsAddingQuestion(true);
  };

  const handleDeleteQuestion = (_id: string) => {
    setQuestions(questions.filter((q) => q._id !== _id));
  };

  const handleAddQuestion = () => {
    setIsAddingQuestion(true);
    setFormData({
      _id: "",
      question: "",
      options: ["", "", "", ""],
      correct_answer: 0,
      points: 1,
      difficulty: "medium",
      category: "",
    });
  };

  const handleSubmitQuiz = () => {
    const data = {
      title: quizTitle,
      createdBy: quizCreator,
      questions: [...questions],
    };
    console.log(data);
    const res = apiService.addQuiz(data);
    res
      .then(() => {
        navigate("/quiz");
      })
      .finally(() => {
        console.log(data);
        setIsModalOpen(false);
        setQuizCreator("");
        setQuizTitle("");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="container mx-auto px-4 py-4 sm:px-6 lg:px-8"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={slideUp}
        >
          <h1 className="text-3xl font-extrabold text-gray-900">
            Quiz Management
          </h1>

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddQuestion()}
              className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <PlusCircle className="h-4 w-5" />
              <span>Add Question</span>
            </motion.button>
            {questions.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-200"
              >
                Save Quiz
              </motion.button>
            )}
          </div>
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white p-6 rounded-lg shadow-lg w-96"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                >
                  <h2 className="text-xl font-bold mb-4">Save Quiz</h2>

                  <label className="block mb-2 text-gray-700">Quiz Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title"
                    required
                  />

                  <label className="block mt-4 mb-2 text-gray-700">
                    Quiz Creator
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={quizCreator}
                    onChange={(e) => setQuizCreator(e.target.value)}
                    placeholder="Enter creator name"
                  />

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setQuizCreator("");
                        setQuizTitle("");
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Submit
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {isAddingQuestion && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={modalVariants}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                className="bg-white rounded-xl p-6 w-full max-w-2xl"
                variants={slideUp}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {isEditingQuestion ? "Edit Question" : "Add New Question"}
                  </h2>
                  <button
                    onClick={() => setIsAddingQuestion(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={formData.question}
                      onChange={(e) =>
                        setFormData({ ...formData, question: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Options
                    </label>
                    {formData.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...formData.options];
                            newOptions[index] = e.target.value;
                            setFormData({ ...formData, options: newOptions });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <input
                          type="radio"
                          name="correct_answer"
                          checked={formData.correct_answer === index}
                          onChange={() =>
                            setFormData({ ...formData, correct_answer: index })
                          }
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Points
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.points}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            points: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Difficulty
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            difficulty: e.target.value as
                              | "easy"
                              | "medium"
                              | "hard",
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsAddingQuestion(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveQuestion}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Save Question
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          variants={slideUp}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Options
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {questions.map((question, idx) => (
                  <motion.tr
                    key={question._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: idx * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {question.question}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.options.join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        question.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : question.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      >
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditQuestion(question)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Pencil size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteQuestion(question._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      </motion.div>
      </main>
    </div>
  );
}

export default QuizAdmin;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GraduationCap, BookOpen } from "lucide-react";
import { useState } from "react";
import { Module } from "../types";

const modules: Module[] = [
  {
    id: 1,
    title: "CS Fundamentals",
    description: "Learn the basics of computer science and programming",
    topics: [
      {
        name: "Introduction to Computing",
        link: "https://example.com/intro-computing",
      },
      { name: "Data Structures", link: "https://example.com/data-structures" },
      { name: "Algorithms", link: "https://example.com/algorithms" },
    ],
  },
  {
    id: 2,
    title: "HTML & CSS",
    description: "Master the fundamentals of web development",
    topics: [
      { name: "HTML Basics", link: "https://example.com/html-basics" },
      { name: "CSS Styling", link: "https://example.com/css-styling" },
      {
        name: "Responsive Design",
        link: "https://example.com/responsive-design",
      },
    ],
  },
  {
    id: 3,
    title: "JavaScript",
    description: "Learn modern JavaScript programming",
    topics: [
      { name: "JS Fundamentals", link: "https://example.com/js-fundamentals" },
      { name: "DOM Manipulation", link: "https://example.com/dom" },
      { name: "Async Programming", link: "https://example.com/async" },
    ],
  },
  {
    id: 4,
    title: "React Development",
    description: "Build modern web applications with React",
    topics: [
      { name: "React Basics", link: "https://example.com/react-basics" },
      { name: "Hooks & State", link: "https://example.com/hooks" },
      { name: "React Router", link: "https://example.com/router" },
    ],
  },
  {
    id: 5,
    title: "Backend Development",
    description: "Learn server-side programming",
    topics: [
      { name: "Node.js Basics", link: "https://example.com/nodejs" },
      { name: "Express Framework", link: "https://example.com/express" },
      { name: "Database Integration", link: "https://example.com/database" },
    ],
  },
];

function Courses() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <GraduationCap className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Learning Path
          </h1>
          <p className="text-xl text-gray-600">
            Master web development with our comprehensive curriculum
          </p>
        </motion.div>

        <div className="space-y-4">
          {modules.map((module) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: module.id * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedModule(
                    expandedModule === module.id ? null : module.id
                  )
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 text-indigo-600 mr-3" />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Module {module.id}: {module.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {module.description}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedModule === module.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedModule === module.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-200"
                  >
                    <div className="px-6 py-4 space-y-2">
                      {module.topics.map((topic, index) => (
                        <motion.a
                          key={index}
                          href={topic.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="block p-3 rounded-md hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                        >
                          {topic.name}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { courses, getIconComponent } from "../data//RoadmapCourseData";

const CoursesPage: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Learning Roadmaps
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Step-by-step guides to help you navigate your learning journey in
          various tech domains.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => {
          const IconComponent = getIconComponent(course.icon);

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Link to={`/roadmap/${course.id}`} className="block h-full">
                <div className={`p-6 ${course.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <IconComponent className="h-8 w-8" />
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
                      Popularity: {course.popularity}%
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold">{course.title}</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{course.description}</p>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                        {course.nodes.length}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Steps in roadmap
                      </p>
                      <p className="text-sm text-gray-500">Click to explore</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900">
          How to use these roadmaps
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          Each roadmap provides a structured learning path. Click on any course
          to see a detailed step-by-step guide. The roadmaps are designed to
          help you understand the logical progression of skills and concepts.
        </p>
      </motion.div>
    </div>
  );
};

export default CoursesPage;

import React, { useState, useEffect } from "react";
import { courses, Course } from "../data/courses";
import CourseCard from "../components/CourseCard";

const CoursesPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Expand Your Knowledge
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top-quality courses taught by experts and take your skills
            to the next level.
          </p>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
               <CourseCard course={course} />
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default CoursesPage;
import React from "react";
import { Star } from "lucide-react";
import { Course } from "../data/courses";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <span className="text-white font-medium p-4">View Course</span>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 bg-blue-100 text-indigo-600 text-xs font-semibold rounded">
            {course.category}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium ml-1">{course.rating}</span>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {course.description}
        </p>
        <div className="mt-auto">
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {course.students.toLocaleString()} students
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

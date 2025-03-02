import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  CheckCircle,
  BookOpen,
  Lock,
} from "lucide-react";
import { useCourses } from "../context/CourseContext";

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, enrollInCourse, isEnrolled } = useCourses();
  const course = courses.find((c) => c.id === id);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const enrolled = id ? isEnrolled(id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleEnroll = () => {
    if (id) {
      enrollInCourse(id);
      navigate(`/courses/${id}/content`);
    }
  };

  const handleViewContent = () => {
    navigate(`/courses/${id}/content`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-300 rounded w-32 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>
              <div className="h-64 bg-gray-300 rounded mb-6"></div>
              <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-8"></div>
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 bg-gray-300 rounded w-full mb-3"
                ></div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 h-96"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-purple-700"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/courses"
          className="inline-flex items-center text-indigo-600 hover:text-purple-800 mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
          Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {course.title}
            </h1>

            <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-auto object-cover aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                <div className="p-6 text-white">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full mb-2 inline-block">
                    {course.category}
                  </span>
                  <h2 className="text-2xl font-bold">{course.title}</h2>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md mb-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Course
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                  <Users className="h-6 w-6 text-indigo-600 mb-2" />
                  <span className="text-sm text-gray-600">Students</span>
                  <span className="font-bold">
                    {course.students.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                  <Clock className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="font-bold">12 Hours</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-yellow-50 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600 mb-2" />
                  <span className="text-sm text-gray-600">Rating</span>
                  <span className="font-bold">{course.rating}/5</span>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl p-6 shadow-md animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What You'll Learn
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.topics.map((topic, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="lg:col-span-1 animate-slide-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              <div className="p-6">
                {enrolled ? (
                  <button
                    onClick={handleViewContent}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg mb-4 transition-colors flex items-center justify-center"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    View Course Content
                  </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="w-full bg-indigo-600 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg mb-4 transition-colors"
                  >
                    Enroll Now
                  </button>
                )}

                <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 border border-gray-300 rounded-lg mb-6 transition-colors">
                  Add to Wishlist
                </button>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    This Course Includes:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Full lifetime access
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Access on mobile and desktop
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Downloadable resources
                    </li>
                  </ul>
                </div>

                {course.contents.length > 0 && (
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold text-gray-900">
                        Course Content:
                      </h3>
                      <span className="ml-2 text-sm bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                        {course.contents.length} items
                      </span>
                    </div>
                    {!enrolled && (
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Lock className="h-4 w-4 mr-1" />
                        <span>Enroll to unlock all content</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;

import { BookOpen, Video, Users } from "lucide-react";
import { Course } from "../types";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Data Structures and Algorithms",
    description: "Master the fundamentals of DSA",
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "Machine Learning Basics",
    description: "Introduction to ML concepts and applications",
    imageUrl:
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=800",
  },
];

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-3 bg-indigo-100 rounded-full">
        <Icon className="h-8 w-8 text-indigo-600" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

const CourseCard = ({ course, index }: { course: Course; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="relative">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          >
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-transform duration-200">
              Learn More
            </button>
          </motion.div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {course.title}
          </h3>
          <p className="mt-2 text-gray-600">{course.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function LandingPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-indigo-600 text-white pt-32 pb-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold sm:text-5xl md:text-6xl"
          >
            Learn. Grow. Succeed.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-3 max-w-md mx-auto text-xl text-indigo-100 sm:text-2xl md:mt-5 md:max-w-3xl"
          >
            Access quality education materials and connect with alumni
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105">
              Get Started
            </button>
          </motion.div>
        </div>
      </motion.div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={Video}
              title="Video Lectures"
              description="Access high-quality video lectures from expert instructors"
            />
            <FeatureCard
              icon={BookOpen}
              title="Study Materials"
              description="Comprehensive study materials and resources"
            />
            <FeatureCard
              icon={Users}
              title="Alumni Network"
              description="Connect with alumni and expand your network"
            />
          </div>
        </div>
      </div>

      <div ref={ref} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-900 mb-12 text-center"
          >
            Featured Courses
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course, courses as initialCourses } from "../data/courses";

interface CourseContextType {
  courses: Course[];
  enrollInCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  addCourseContent: (courseId: string, content: any) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Try to load courses from localStorage, or use initial data
  const [courses, setCourses] = useState<Course[]>(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  });

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const enrollInCourse = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId && !course.enrolled
          ? { ...course, enrolled: true }
          : course
      )
    );
  };

  const isEnrolled = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course?.enrolled || false;
  };

  const addCourseContent = (courseId: string, content: any) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              contents: course.contents
                ? [...course.contents, content]
                : [content],
            }
          : course
      )
    );
  };

  return (
    <CourseContext.Provider
      value={{ courses, enrollInCourse, isEnrolled, addCourseContent }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};

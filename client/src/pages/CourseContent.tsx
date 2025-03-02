import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Video,
  File,
  ExternalLink,
  Download,
} from "lucide-react";
import { useCourses } from "../context/CourseContext";

const CourseContentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, isEnrolled } = useCourses();
  const course = courses.find((c) => c.id === id);
  const [activeContent, setActiveContent] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Set the first content item as active if available
    if (course?.contents && course.contents.length > 0) {
      setActiveContent(course.contents[0].id);
    }
  }, [course]);

  // Redirect if not enrolled
  if (id && !isEnrolled(id)) {
    return <Navigate to={`/courses/${id}`} />;
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

  const getContentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "video":
        return <Video className="h-5 w-5 text-blue-500" />;
      case "ppt":
        return <File className="h-5 w-5 text-orange-500" />;
      case "doc":
        return <File className="h-5 w-5 text-blue-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case "pdf":
        return "PDF Document";
      case "video":
        return "Video";
      case "ppt":
        return "PowerPoint Presentation";
      case "doc":
        return "Word Document";
      case "link":
        return "External Link";
      default:
        return "Document";
    }
  };

  const activeContentItem = course.contents.find((c) => c.id === activeContent);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to={`/courses/${id}`}
            className="inline-flex items-center text-indigo-600 hover:text-purple-800 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
            Back to Course Details
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 bg-indigo-700 text-white">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-indigo-200 mt-2">Course Content</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Content List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-bold text-gray-900">Course Materials</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {course.contents.length > 0 ? (
                  course.contents.map((content) => (
                    <button
                      key={content.id}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-start ${
                        activeContent === content.id ? "bg-indigo-50" : ""
                      }`}
                      onClick={() => setActiveContent(content.id)}
                    >
                      <div className="mr-3 mt-0.5">
                        {getContentIcon(content.type)}
                      </div>
                      <div>
                        <h3
                          className={`font-medium ${
                            activeContent === content.id
                              ? "text-indigo-700"
                              : "text-gray-900"
                          }`}
                        >
                          {content.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {getContentTypeLabel(content.type)}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">
                      No content has been uploaded for this course yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Display Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden min-h-[500px]">
              {activeContentItem ? (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">
                        {activeContentItem.title}
                      </h2>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                        {getContentTypeLabel(activeContentItem.type)}
                      </span>
                    </div>
                    {activeContentItem.description && (
                      <p className="mt-2 text-gray-600">
                        {activeContentItem.description}
                      </p>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Content display based on type */}
                    {activeContentItem.type === "video" ? (
                      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                        <div className="text-center p-8">
                          <Video className="h-16 w-16 text-white/50 mx-auto mb-4" />
                          <p className="text-white/70">
                            This video is hosted on Google Drive.
                          </p>
                          <a
                            href={activeContentItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Video
                          </a>
                        </div>
                      </div>
                    ) : activeContentItem.type === "pdf" ? (
                      <div className="border border-gray-200 rounded-lg p-8 text-center">
                        <FileText className="h-16 w-16 text-red-500/50 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                          PDF document is available on Google Drive
                        </p>
                        <div className="flex justify-center space-x-4">
                          <a
                            href={activeContentItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View PDF
                          </a>
                          <a
                            href={activeContentItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-8 text-center">
                        {getContentIcon(activeContentItem.type)}
                        <p className="text-gray-600 mt-4 mb-4">
                          This content is available on Google Drive
                        </p>
                        <a
                          href={activeContentItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Content
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[500px]">
                  <div className="text-center p-8">
                    <File className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No Content Selected
                    </h3>
                    <p className="text-gray-500">
                      {course.contents.length > 0
                        ? "Select a content item from the sidebar to view it"
                        : "No content has been uploaded for this course yet"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage;

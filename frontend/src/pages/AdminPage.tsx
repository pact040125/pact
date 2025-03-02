import React, { useState } from "react";
import { useCourses } from "../context/CourseContext";
import { FileText, Video, File, Plus } from "lucide-react";

const AdminPage: React.FC = () => {
  const { courses, addCourseContent } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [contentTitle, setContentTitle] = useState<string>("");
  const [contentType, setContentType] = useState<string>("pdf");
  const [contentUrl, setContentUrl] = useState<string>("");
  const [contentDescription, setContentDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse || !contentTitle || !contentType || !contentUrl) {
      return;
    }

    setIsSubmitting(true);
    const newContent = {
      id: `content-${Date.now()}`,
      title: contentTitle,
      type: contentType,
      url: contentUrl,
      description: contentDescription,
    };
    addCourseContent(selectedCourse, newContent);

    // Reset form
    setContentTitle("");
    setContentUrl("");
    setContentDescription("");
    setIsSubmitting(false);

    // Show success message
    setSuccessMessage("Content added successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-indigo-700 text-white">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-indigo-200 mt-2">
              Add and manage course content
            </p>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Add New Course Content
            </h2>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Course
                  </label>
                  <select
                    id="course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Content Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., Introduction to HTML"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Content Type
                  </label>
                  <select
                    id="type"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="video">Video</option>
                    <option value="ppt">PowerPoint Presentation</option>
                    <option value="doc">Word Document</option>
                    <option value="link">External Link</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Google Drive URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={contentUrl}
                    onChange={(e) => setContentUrl(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="https://drive.google.com/file/d/..."
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Paste the Google Drive sharing link for the content
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    value={contentDescription}
                    onChange={(e) => setContentDescription(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Brief description of the content..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Adding..."
                  ) : (
                    <>
                      <Plus className="mr-2 h-5 w-5" />
                      Add Content
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Course Content Overview */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Course Content Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-4 bg-gray-50 border-b">
                  <h3 className="font-bold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-500">
                    {course.contents.length} content items
                  </p>
                </div>

                <div className="p-4">
                  {course.contents.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {course.contents.map((content) => (
                        <li key={content.id} className="py-3">
                          <div className="flex items-start">
                            <div className="mr-3 mt-0.5">
                              {content.type === "pdf" && (
                                <FileText className="h-5 w-5 text-red-500" />
                              )}
                              {content.type === "video" && (
                                <Video className="h-5 w-5 text-blue-500" />
                              )}
                              {(content.type === "ppt" ||
                                content.type === "doc") && (
                                <File className="h-5 w-5 text-orange-500" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {content.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {content.type.toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">
                        No content has been added to this course yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

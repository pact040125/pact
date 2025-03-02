import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import { AuthForm } from "./components/AuthForm";
import { LandingPage } from "./pages/LandingPage";
import Chat from "./pages/QandA";
import UserQuiz from "./pages/UserQuiz";
import Quiz from "./pages/Quiz";
import QuizAdmin from "./pages/QuizAdmin";
import CoursePage from "./pages/CoursePage";
import Interviews from "./pages/Interviews";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import CourseContentPage from "./pages/CourseContent";
import RoadMapCoursesPage from "./pages/RoadmapCoursePage";
import RoadmapPage from "./pages/RoadmapPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import { CourseProvider } from "./context/CourseContext";
import LiveSessions from "./pages/LiveSessions";
import Navigation from "./components/Navigation";

function App() {
  function PrivateRoute({ element }: { element: JSX.Element }) {
    const user = localStorage.getItem("user");
    return user ? element : <Navigate to="/login" replace />;
  }

  return (
    <CourseProvider>
      <Router>
        <Navigation />
        <div className="mt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/q&as" element={<PrivateRoute element={<Chat />} />} />
          <Route
            path="/quiz/admin"
            element={<PrivateRoute element={<QuizAdmin />} />}
          />
          <Route
            path="/quiz"
            element={<PrivateRoute element={<UserQuiz />} />}
          />
          <Route path="/quiz/:title" element={<Quiz />} />
          <Route
            path="/courses"
            element={<PrivateRoute element={<CoursePage />} />}
          />
          <Route
            path="/livesessions"
            element={<PrivateRoute element={<LiveSessions />} />}
          />
          <Route
            path="/interviews"
            element={<PrivateRoute element={<Interviews />} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/roadmaps"
            element={<PrivateRoute element={<RoadMapCoursesPage />} />}
          />
          <Route path="/roadmap/:courseId" element={<RoadmapPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/courses/:id/content" element={<CourseContentPage />} />
          <Route path="/admin-courses" element={<AdminPage />} />
          
        </Routes>
        </div>
      </Router>
    </CourseProvider>
  );
}

export default App;

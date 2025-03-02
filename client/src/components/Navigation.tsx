import { motion } from "framer-motion";
import { LogOut, Users, Menu, X, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { _user } from "../services/user";

export default function Navigation() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(_user);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.img
              src={logo}
              alt="Logo"
              className="w-24 h-24 cursor-pointer"
              onClick={() => navigate("/")}
            />

            <nav className="hidden md:flex space-x-8">
              {["Home", "Courses", "Roadmaps", "Live sessions", "Interviews", "Quiz", "Q&As", "About"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replaceAll(" ", "")}`}
                    className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {isAuthenticated ? (
              <div className="relative hidden md:flex items-center" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                >
                  <Users size={24} />
                  <span>{_user.name || "User"}</span>
                </button>

                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-20 mt-20 w-48 bg-white shadow-md rounded-md overflow-hidden"
                  >
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="inline-block mr-2" size={18} />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="inline-block mr-2" size={18} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div className="hidden md:flex" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-200"
                >
                  Sign in
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md"
          >
            <nav className="flex flex-col space-y-4 p-4">
              {["Home", "Roadmaps", "Live sessions", "Interviews", "Quiz", "Q&As", "About"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replaceAll(" ", "")}`}
                  className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="mt-4 border-t pt-4">
                  <p className="px-4 text-gray-700 font-medium">User</p>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="inline-block mr-2" size={18} />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="inline-block mr-2" size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-200 mt-4 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </header>
    </>
  );
}

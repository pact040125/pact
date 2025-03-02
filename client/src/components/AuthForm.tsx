import React, { useEffect, useState } from "react";
import { GraduationCap, User, Lock, Mail } from "lucide-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apiService from "../services/api";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const formVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export function AuthForm() {
  const location = useLocation();
  const [token, setToken] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const currYear = new Date().getFullYear();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [graduationYear, setGraduationYear] = useState(currYear);
  const [mobile, setMobile] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const inviteToken = params.get("token");
    if (inviteToken) {
      setToken(inviteToken);
      setIsLogin(false);
    }
  }, [location.search]);
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [isLogin]);

  const navigate = useNavigate();
  const handleAuth = async () => {
    setErrorMessage(null);
    if (isLogin) {
      try {
        const { data } = await apiService.loginUser(email, password);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        setErrorMessage(
          "Login failed. Please check your credentials and try again."
        );
      }
    } else {
      try {
        const { data } = await apiService.createUser(
          username,
          email,
          password,
          graduationYear,
          token,
          mobile
        );
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {isLogin ? "Welcome Back!" : "Join Our Community"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin
              ? "Sign in to continue your journey"
              : "Create an account to get started"}
          </p>
        </motion.div>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-red-600 text-sm text-center bg-red-100 p-2 rounded-md"
          >
            {errorMessage}
          </motion.div>
        )}
        <motion.form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-center p-4 border rounded-lg transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent"
                    >
                      <User className="w-5 h-5 mr-2" />
                      Member
                    </motion.div>
                  </div>
                </div>

                <motion.div variants={fadeIn}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      value={mobile}
                      placeholder="Enter 10-digit mobile number"
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setMobile(value);
                      }}
                      pattern="\d{10}"
                      maxLength={10}
                    />
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <label className="text-sm font-medium text-gray-700">
                        Year of Study
                      </label>
                    </div>
                    <div className="flex gap-4 justify-between mt-1">
                      <input
                        type="text"
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                        defaultValue="Student"
                        disabled
                      />
                      <div className="w-1/3">
                        <Select
                          value={4 - (graduationYear - currYear)}
                          onChange={(e) =>
                            setGraduationYear(
                              currYear + (4 - Number(e.target.value))
                            )
                          }
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "rgb(209 213 219)",
                              },
                              "&:hover fieldset": {
                                borderColor: "rgb(79 70 229)",
                              },
                            },
                          }}
                        >
                          <MenuItem value={1}>I</MenuItem>
                          <MenuItem value={2}>II</MenuItem>
                          <MenuItem value={3}>III</MenuItem>
                          <MenuItem value={4}>IV</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <motion.div variants={fadeIn}>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              {isLogin ? "Sign in" : "Create Account"}
            </button>
          </motion.div>
        </motion.form>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

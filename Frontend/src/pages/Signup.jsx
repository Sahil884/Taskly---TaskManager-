import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/auth";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_Backend_URL;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigate.state === "submitting";

  const [errMessage, setErrMessage] = useState(null);
  const [enteredValue, setEnteredValue] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(identifier, value) {
    setEnteredValue((prevVal) => ({
      ...prevVal,
      [identifier]: value,
    }));
  }

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/users/register`,
        {
          fullName: enteredValue.fullName,
          email: enteredValue.email,
          username: enteredValue.username,
          password: enteredValue.password,
        }
      );

      console.log("Data submitted successfully", response.data);

      setEnteredValue({
        fullName: "",
        username: "",
        email: "",
        password: "",
      });

      setSearchParams({ mode: "login" });
    } catch (error) {
      if (error.status == 409) {
        setErrMessage("User with email or username already exists");
      } else {
        setErrMessage(null);
        console.error("Error submitting data", error.data);
      }
    }
  };

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/users/login`, {
        email: enteredValue.email,
        password: enteredValue.password,
      });

      dispatch(authAction.login(response.data.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <>
      {isLogin && (
        <div id="loginPage" className="page active">
          <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
              {/* <!-- Logo & Header --> */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="text-gray-600 mt-2">
                  Sign in to manage your tasks
                </p>
              </div>

              {/* <!-- Demo Credentials --> */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-blue-800">
                  Demo: demo@example.com / password123
                </p>
              </div>

              {/* <!-- Login Form --> */}
              <form onSubmit={loginUser} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={enteredValue.email}
                    id="loginEmail"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={enteredValue.password}
                    id="loginPassword"
                    required
                    minLength="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="••••••••"
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition transform hover:scale-[1.02]"
                >
                  {isSubmitting ? "Signing In" : "Sign In"}
                </button>
              </form>

              {/*  Switch to Register  */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?
                  <span className="text-indigo-600 font-medium hover:underline">
                    <Link to={`?mode=signup`}>Sign up</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  ========== REGISTER PAGE ========== */}
      {!isLogin && (
        <div id="registerPage" className="">
          <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
              {/* <!-- Logo & Header --> */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Create Account
                </h2>
                <p className="text-gray-600 mt-2">
                  Get started with your task manager
                </p>
              </div>

              {/*  Register Form  */}
              <form onSubmit={registerUser} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={enteredValue.fullName}
                    id="registerName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="John Doe"
                    onChange={(event) =>
                      handleChange("fullName", event.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={enteredValue.email}
                    id="registerEmail"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={enteredValue.username}
                    id="userName"
                    required
                    minLength="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="john123"
                    onChange={(event) =>
                      handleChange("username", event.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={enteredValue.password}
                    id="registerConfirmPassword"
                    required
                    minLength="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="••••••••"
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition transform hover:scale-[1.02]"
                >
                  Create Account
                </button>
              </form>

              {/*  Switch to Login */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?
                  <span className="text-indigo-600 font-medium hover:underline">
                    <Link to={"?mode=login"}>Sign in</Link>
                  </span>
                </p>
                <p className="text-black">{errMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;

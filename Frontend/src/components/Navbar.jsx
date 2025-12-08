import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "./UserAvatar";
import { useState } from "react";
import AccountDropdown from "./Account_dropdown";
import { getInitials } from "../utils";
import { authAction } from "../store/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked((prev) => !prev);
  }

  const initials = currentUser?.fullName
    ? getInitials(currentUser.fullName)
    : "";

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        "/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      dispatch(authAction.logout());
      console.log("successfully loged out ");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("something went wrong!", error);
    }
  };
  return (
    <>
      <nav className="bg-white shadow-sm  sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo & Brand  */}
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
                <svg
                  className="w-6 h-6 text-white"
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
              <Link to={"/dashboard"}>
                <div>
                  <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600 tracking-wide">
                    Taskly
                  </h1>
                  <p className="text-xs text-gray-500 italic">
                    Organize. Focus. Achieve.
                  </p>
                </div>
              </Link>
            </div>

            {/* <!-- Right Side Nav Items --> */}
            <div className="flex items-center space-x-4">
              {/* <!-- Settings --> */}
              <Link
                to="/dashboard/account-details"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </Link>

              {/* <!-- User Profile Dropdown --> */}
              <div className="relative inline-block">
                <div
                  onClick={handleClick}
                  className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                >
                  <UserAvatar initials={initials} />
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700">
                      {currentUser?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {currentUser?.email}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
                <div className="">
                  <AccountDropdown
                    clicked={clicked}
                    clickFunction={handleClick}
                  />
                </div>
              </div>

              {/* <!-- Logout Button --> */}
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                onClick={logoutUser}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                <span className="hidden md:inline text-sm font-medium">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

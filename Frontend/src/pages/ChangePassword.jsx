import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { redirect, replace, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [enteredValues, setEnteredValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errMessage, setErrMessage] = useState();

  function handleChange(identifier, value) {
    setEnteredValues((prevVal) => ({
      ...prevVal,
      [identifier]: value,
    }));
    console.log();
  }

  const changePassword = async (event) => {
    event.preventDefault();
    if (enteredValues.newPassword === enteredValues.confirmNewPassword) {
      try {
        const response = await axios.post(
          "/api/v1/users/change-password",
          {
            oldPassword: enteredValues.currentPassword,
            newPassword: enteredValues.newPassword,
          },
          { withCredentials: true }
        );

        setEnteredValues({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });

        console.log("Password Successfully Changed", response.data);

        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("something went wrong", error);
      }
    } else setErrMessage("passwords doesnot match");
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔒 Change Password
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Update your credentials to keep your account secure.
          </p>

          <form onSubmit={changePassword} className="space-y-5">
            {/* <!-- Current Password --> */}
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                name="current-password"
                required
                value={enteredValues.currentPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(event) =>
                  handleChange("currentPassword", event.target.value)
                }
              />
            </div>

            {/* <!-- New Password --> */}
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                name="new-password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(event) =>
                  handleChange("newPassword", event.target.value)
                }
                value={enteredValues.newPassword}
              />
            </div>

            {/* <!-- Confirm Password --> */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(event) =>
                  handleChange("confirmNewPassword", event.target.value)
                }
                value={enteredValues.confirmNewPassword}
              />
              {errMessage && (
                <p className="text-red-500 text-sm mt-1">{errMessage}</p>
              )}
            </div>

            {/* <!-- Submit Button --> */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

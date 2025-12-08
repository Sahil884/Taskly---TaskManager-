import { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../store/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.Backend_URL;

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);

  const [eneteredValue, setEnteredValue] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(identifier, value) {
    setEnteredValue((prevVal) => ({
      ...prevVal,
      [identifier]: value,
    }));
  }

  const updateProfile = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/v1/users/update-account`,
        {
          fullName: eneteredValue.fullName,
          email: eneteredValue.email,
        },
        { withCredentials: true }
      );

      dispatch(
        authAction.updateProfile({
          email: eneteredValue.email,
          fullName: eneteredValue.fullName,
        })
      );

      setEnteredValue({ fullName: "", email: "" });

      console.log("profile updated");
      navigate("/dashboard/account-details");
    } catch (error) {
      console.error("Can't update Profile", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            👤 Edit Profile
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Update your personal information to keep your profile up to date.
          </p>

          <form onSubmit={updateProfile} className="space-y-5">
            {/* <!-- Full Name --> */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={user.fullName}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(event) =>
                  handleChange("fullName", event.target.value)
                }
                value={eneteredValue.fullName}
              />
            </div>

            {/* <!-- Email --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={user.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(event) => handleChange("email", event.target.value)}
                value={eneteredValue.email}
              />
            </div>

            {/* <!-- Submit Button --> */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

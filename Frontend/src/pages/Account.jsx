import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Account = () => {
  const user = useSelector((state) => state.auth.user);
  const firstName = user?.fullName.split(" ")[0];
  const createdAt = user?.createdAt;
  const dateOnly = new Date(createdAt).toLocaleDateString("en-US");

  return (
    <div>
      <Navbar />
      <header className="bg-indigo-600 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-semibold">Account Details</h1>
      </header>

      {/* <!-- Container --> */}
      <main className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
        {/* <!-- Greeting --> */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Welcome,{firstName}
          </h2>
          <p className="text-sm text-gray-500">
            Here’s your account information.
          </p>
        </div>

        {/* <!-- Account Info Grid --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <!-- Full Name --> */}
          <div className="bg-gray-50 p-4 rounded-md border">
            <h3 className="text-sm text-gray-500">Full Name</h3>
            <p className="text-lg font-medium text-gray-800">
              {user?.fullName}
            </p>
          </div>

          {/* <!-- Username --> */}
          <div className="bg-gray-50 p-4 rounded-md border">
            <h3 className="text-sm text-gray-500">Username</h3>
            <p className="text-lg font-medium text-gray-800">
              {user?.username}
            </p>
          </div>

          {/* <!-- Email --> */}
          <div className="bg-gray-50 p-4 rounded-md border">
            <h3 className="text-sm text-gray-500">Email</h3>
            <p className="text-lg font-medium text-gray-800">{user?.email}</p>
          </div>

          {/* <!-- Account Created --> */}
          <div className="bg-gray-50 p-4 rounded-md border">
            <h3 className="text-sm text-gray-500">Account Created</h3>
            <p className="text-lg font-medium text-gray-800">{dateOnly}</p>
          </div>
        </div>

        {/* <!-- Actions --> */}
        <div className="mt-8 flex justify-end gap-4">
          <Link
            to={"/dashboard/account-details/edit-profile"}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Edit Profile
          </Link>
          <Link
            to={"/dashboard/account-details/change-password"}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Change Password
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Account;

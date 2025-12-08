import { Link, replace } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAvatar from "../components/UserAvatar";
import { getInitials } from "../utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_Backend_URL;

const CreateTask = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const initials = user?.fullName ? getInitials(user.fullName) : "";
  const [users, setUsers] = useState([]);

  const [enteredValue, setEnteredValue] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    status: "pending",
    category: "",
    assignedTo: "",
  });

  function handleChange(identifier, value) {
    setEnteredValue((prevVal) => ({
      ...prevVal,
      [identifier]: value,
    }));
    console.log();
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/users/all-users`
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/tasks/task`,
        {
          title: enteredValue.title,
          description: enteredValue.description,
          priority: enteredValue.priority,
          dueDate: enteredValue.dueDate,
          status: enteredValue.status,
          category: enteredValue.category,
          assignedTo: enteredValue.assignedTo,
        },
        { withCredentials: true }
      );

      setEnteredValue({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        status: "",
        category: "",
        assignedTo: "",
      });

      console.log("task created successfully", response);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("task can't be created ", error);
    }
  };

  return (
    <div>
      <nav className="bg-white shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* <!-- Logo & Brand --> */}
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
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
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            </div>

            {/* <!-- Right Side Nav Items --> */}
            <div className="flex items-center space-x-4">
              {/* <!-- Back to Dashboard --> */}
              <Link
                to="/dashboard"
                replace
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                <span className="font-medium">Back to Dashboard</span>
              </Link>

              {/* <!-- User Profile --> */}
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                {/* <img
                  src="https://ui-avatars.com/api/?name=Demo+User&background=4F46E5&color=fff"
                  alt="User"
                  classNameName="w-8 h-8 rounded-full"
                /> */}
                <UserAvatar initials={initials} />
                <span className="text-sm font-medium text-gray-700 hidden md:inline">
                  {user.fullName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <!-- Page Header --> */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Task
          </h2>
          <p className="text-gray-600">
            Fill in the details below to add a new task to your workflow.
          </p>
        </div>

        {/* <!-- Add Task Form --> */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
          <form onSubmit={handleSubmit}>
            {/* <!-- Task Title --> */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter task title (e.g., Complete project documentation)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                onChange={(event) => handleChange("title", event.target.value)}
                value={enteredValue.title}
              />
              <p className="text-xs text-gray-500 mt-1">
                Give your task a clear and descriptive title
              </p>
            </div>

            {/* <!-- Task Description --> */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows="5"
                placeholder="Describe the task in detail..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900 placeholder-gray-400 resize-none"
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                value={enteredValue.description}
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Provide comprehensive details about what needs to be done
              </p>
            </div>

            {/* <!-- Two Column Grid --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* <!-- Priority --> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white cursor-pointer"
                  onChange={(event) =>
                    handleChange("priority", event.target.value)
                  }
                  value={enteredValue.priority}
                >
                  <option value="">Select priority level</option>
                  <option value="low">🟢 Low - Can wait</option>
                  <option value="medium">🟡 Medium - Normal priority</option>
                  <option value="high">🔴 High - Urgent</option>
                </select>
              </div>

              {/* <!-- Status --> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white cursor-pointer"
                  onChange={(event) =>
                    handleChange("status", event.target.value)
                  }
                  value={enteredValue.status}
                >
                  <option value="pending">⏸️ Pending</option>
                  <option value="in-progress">⚡ In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>
            </div>

            {/* <!-- Two Column Grid --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* <!-- Due Date --> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition cursor-pointer"
                  onChange={(event) =>
                    handleChange("dueDate", event.target.value)
                  }
                  value={enteredValue.dueDate}
                />
              </div>

              {/* <!-- Category --> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white cursor-pointer"
                  onChange={(event) =>
                    handleChange("category", event.target.value)
                  }
                  value={enteredValue.category}
                >
                  <option>Select category</option>
                  <option value="development">💻 Development</option>
                  <option value="design">🎨 Design</option>
                  <option value="marketing">📢 Marketing</option>
                  <option value="documentation">📝 Documentation</option>
                  <option value="testing">🧪 Testing</option>
                  <option value="other">📋 Other</option>
                </select>
              </div>
            </div>

            {/* <!-- Assigned To --> */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assign To
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white cursor-pointer"
                onChange={(event) =>
                  handleChange("assignedTo", event.target.value)
                }
                value={enteredValue.assignedTo}
              >
                <option>Select team member</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    👤{user.fullName} ({user.username})
                  </option>
                ))}
              </select>
            </div>

            {/* <!-- Action Buttons --> */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                replace
                type="button"
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5 inline-block mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Cancel
              </Link>

              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-5 h-5 inline-block mr-2"
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
                Create Task
              </button>
            </div>
          </form>
        </div>

        {/* <!-- Help Section --> */}
        <div className="mt-8 bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <div className="flex items-start">
            <div className="bg-indigo-600 p-3 rounded-lg mr-4">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Tips for Creating Effective Tasks
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use clear and actionable task titles</li>
                <li>
                  • Set realistic due dates to keep your workflow organized
                </li>
                <li>• Add detailed descriptions to avoid confusion later</li>
                <li>• Assign high priority only to truly urgent tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;

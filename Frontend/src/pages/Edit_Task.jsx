import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_Backend_URL;

const Edit_Task = ({ onClose, taskId, refreshTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
    assignedTo: "",
    category: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/tasks/${taskId}/task`,
          { withCredentials: true }
        );
        const task = response.data.data;

        setFormData({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate?.slice(0, 10), // format for <input type="date">
          assignedTo: task.assignedTo?._id || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (taskId) fetchTask();
  }, [taskId]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/users/all-users`,
          {
            withCredentials: true,
          }
        );
        setUsers(response.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/tasks/${taskId}/task`,
        formData,
        { withCredentials: true }
      );
      refreshTask();

      onClose();
    } catch (error) {
      console.error("can't update task", error);
    }
  };

  return (
    <>
      {/* <!-- Edit Task Modal --> */}
      <div className="fixed inset-0 backdrop-blur-xs bg-white/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
          {/* <!-- Close Button --> */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* <!-- Modal Header --> */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Edit Task
          </h2>

          {/* <!-- Form --> */}
          <form className="space-y-4">
            {/* <!-- Title --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter task title"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                value={formData.title}
              />
            </div>

            {/* <!-- Description --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Enter task description"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
              ></textarea>
            </div>

            {/* <!-- Status & Priority --> */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  value={formData.status}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  value={formData.priority}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* <!-- Due Date --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                value={formData.dueDate}
              />
            </div>

            {/* <!-- Assigned To --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign To
              </label>
              <select
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
                value={formData.assignedTo}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {/* Fallback: show assigned user if not in users list */}
                {formData.assignedTo &&
                  !users.find((u) => u._id === formData.assignedTo) && (
                    <option value={formData.assignedTo}>
                      (Currently assigned user)
                    </option>
                  )}

                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user._id}>
                      👤{user.fullName} ({user.username})
                    </option>
                  ))}
              </select>
            </div>

            {/* <!-- Submit Button --> */}
            <div className="pt-4">
              <button
                onClick={updateTask}
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit_Task;

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import TaskCard from "../components/TaskCard";
import Edit_Task from "./Edit_Task";

const API_BASE_URL = import.meta.env.VITE_Backend_URL;

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const firstName = currentUser.fullName.split(" ")[0];
  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);

  // filter states
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentOrAssigned, setCurrentOrAssigned] = useState("current");

  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const completeCount = tasks.filter((t) => t.status === "completed").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "in-progress"
  ).length;

  // filtered task

  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase().replace(/\s+/g, "");

    const statusMatch =
      statusFilter === "All Status" ||
      task.status.toLowerCase() === statusFilter.toLowerCase();

    const priorityMatch =
      priorityFilter === "All Priority" ||
      task.priority.toLowerCase() === priorityFilter.toLowerCase();

    const searchMatch =
      task.title
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(debouncedQuery.toLowerCase()) ||
      task.description
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(debouncedQuery.toLowerCase());

    return statusMatch && priorityMatch && searchMatch;
  });

  const fetchTask = useCallback(async () => {
    try {
      const endpoint =
        currentOrAssigned === "assigned"
          ? `${API_BASE_URL}/api/v1/tasks/assignedTask`
          : `${API_BASE_URL}/api/v1/tasks/task`;

      const response = await axios.get(
        endpoint,
        {},
        {
          withCredentials: true,
        }
      );
      setTasks(response.data.data);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    fetchTask();
  }, [currentOrAssigned]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // wait 300ms after typing stops

    return () => {
      clearTimeout(handler); // cleanup on new keystroke
    };
  }, [searchQuery]);

  const deleteTask = async (id) => {
    try {
      const deleted = await axios.delete(
        `${API_BASE_URL}/api/v1/tasks/${id}/task`,
        {},
        { withCredentials: true }
      );

      if (!deleted) {
        console.error(400, "Task Can't be deleted, something went wrong!");
      }

      const endpoint =
        currentOrAssigned === "assigned"
          ? `${API_BASE_URL}/api/v1/tasks/assignedTask`
          : `${API_BASE_URL}/api/v1/tasks/task`;

      const response = await axios.get(
        endpoint,
        {},
        {
          withCredentials: true,
        }
      );
      setTasks(response.data.data);

      console.log("task deleted successfully ", deleted);
    } catch (error) {
      console.error("You are not allowed to delete this task.", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <!-- Welcome Section --> */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {firstName}! 👋
          </h2>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your tasks today.
          </p>
        </div>

        {/* <!-- Stats Cards --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-in">
          {/* <!-- Total Tasks Card --> */}
          <div className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium uppercase tracking-wide">
                  Total Tasks
                </p>
                <p className="text-4xl font-bold mt-2">{tasks.length}</p>
              </div>
              <div className="bg-indigo-400 bg-opacity-20 p-4 rounded-xl">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* <!-- Pending Card --> */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Pending
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {pendingCount}
                </p>
                <p className="text-orange-600 text-sm mt-3 font-medium">
                  Need attention
                </p>
              </div>
              <div className="bg-orange-100 p-4 rounded-xl">
                <svg
                  className="w-10 h-10 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* <!-- In Progress Card --> */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  In Progress
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {inProgressCount}
                </p>
                <p className="text-blue-600 text-sm mt-3 font-medium">
                  Active work
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* <!-- Completed Card --> */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                  Completed
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {completeCount}
                </p>
                <p className="text-green-600 text-sm mt-3 font-medium">
                  Great progress!
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <svg
                  className="w-10 h-10 text-green-600"
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
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* <!-- Main Task Section (2/3 width) --> */}
          <div className="lg:col-span-2 space-y-6 ">
            {/* <!-- Filters & Actions --> */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4">
                {/* <!-- Search --> */}
                <div className="flex-1">
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* <!-- Status Filter --> */}
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  value={statusFilter}
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>In-progress</option>
                  <option>Completed</option>
                </select>

                {/* <!-- current or assigned Filter --> */}
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
                  onChange={(e) => setCurrentOrAssigned(e.target.value)}
                  value={currentOrAssigned}
                >
                  <option value="current">My Task</option>
                  <option value="assigned">Assigned</option>
                </select>

                {/* <!-- Priority Filter --> */}
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  value={priorityFilter}
                >
                  <option>All Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                {/* <!-- Add Task Button --> */}
                <Link
                  to={"/dashboard/task"}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 shadow-md whitespace-nowrap"
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
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  <span className="font-medium">New Task</span>
                </Link>
              </div>
            </div>

            {/* <!-- Tasks List --> */}
            <div className="space-y-4">
              {/* <!-- Task Items --> */}
              {filteredTasks.map((task) => (
                // <div
                //   key={task._id}
                //   className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
                //     task.status == "pending"
                //       ? "border-red-500"
                //       : task.status == "in-progress"
                //       ? "border-yellow-500"
                //       : "border-green-500"
                //   }   hover:shadow-lg transition-all duration-300`}
                // >
                //   <div className="flex items-start justify-between">
                //     <div className="flex items-start space-x-4 flex-1">
                //       <button className="mt-1 hover:scale-110 transition">
                //         {task?.status == "pending" ? (
                //           <svg
                //             className="w-7 h-7 text-gray-400 hover:text-indigo-600 transition"
                //             fill="none"
                //             stroke="currentColor"
                //             viewBox="0 0 24 24"
                //           >
                //             <circle
                //               cx="12"
                //               cy="12"
                //               r="10"
                //               strokeWidth="2"
                //             ></circle>
                //           </svg>
                //         ) : task?.status == "in-progress" ? (
                //           <svg
                //             className="w-7 h-7 text-yellow-500"
                //             fill="none"
                //             stroke="currentColor"
                //             viewBox="0 0 24 24"
                //           >
                //             <circle
                //               cx="12"
                //               cy="12"
                //               r="10"
                //               strokeWidth="2"
                //             ></circle>
                //             <path
                //               strokeLinecap="round"
                //               strokeLinejoin="round"
                //               strokeWidth="2"
                //               d="M12 6v6l4 2"
                //             ></path>
                //           </svg>
                //         ) : (
                //           <svg
                //             className="w-7 h-7 text-green-600"
                //             fill="none"
                //             stroke="currentColor"
                //             viewBox="0 0 24 24"
                //           >
                //             <path
                //               strokeLinecap="round"
                //               strokeLinejoin="round"
                //               strokeWidth="2"
                //               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                //             ></path>
                //           </svg>
                //         )}
                //       </button>
                //       <div className="flex-1">
                //         <h3 className="text-lg font-semibold text-gray-900 mb-2">
                //           {task?.title}
                //         </h3>
                //         <p className="text-gray-600 text-sm mb-3">
                //           {task?.description}
                //         </p>
                //         <div className="flex items-center space-x-3 flex-wrap gap-2">
                //           <span
                //             className={`px-3 py-1 rounded-full text-xs font-semibold ${
                //               task?.status == "pending"
                //                 ? "bg-gray-100 border-gray-300 text-gray-700"
                //                 : task?.status == "in-progress"
                //                 ? "bg-yellow-100  border-yellow-300 text-yellow-700"
                //                 : "bg-green-100 border-green-300 text-green-700"
                //             } text-gray-700 border `}
                //           >
                //             {task?.status.charAt(0).toUpperCase() +
                //               task?.status.slice(1)}
                //           </span>
                //           <span
                //             className={`px-3 py-1 rounded-full text-xs font-semibold ${
                //               task?.priority == "high"
                //                 ? "bg-red-100 text-red-700 border-red-300"
                //                 : task?.priority == "medium"
                //                 ? "bg-blue-100 text-blue-700  border-blue-300"
                //                 : "bg-green-100 text-green-700 border-green-300"
                //             }  border `}
                //           >
                //             {task?.priority.charAt(0).toUpperCase() +
                //               task?.priority.slice(1)}{" "}
                //             Priority
                //           </span>

                //           <span className="text-xs text-gray-500 flex items-center">
                //             <svg
                //               className="w-4 h-4 mr-1"
                //               fill="none"
                //               stroke="currentColor"
                //               viewBox="0 0 24 24"
                //             >
                //               <path
                //                 strokeLinecap="round"
                //                 strokeLinejoin="round"
                //                 strokeWidth="2"
                //                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                //               ></path>
                //             </svg>
                //             {new Date(task?.dueDate).toLocaleDateString(
                //               "en-US"
                //             )}
                //           </span>
                //           {task?.assignedTo && (
                //             <span className="text-xs text-gray-500 flex items-center">
                //               <svg
                //                 className="w-4 h-4 mr-1"
                //                 fill="none"
                //                 stroke="currentColor"
                //                 viewBox="0 0 24 24"
                //               >
                //                 <path
                //                   strokeLinecap="round"
                //                   strokeLinejoin="round"
                //                   strokeWidth="2"
                //                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                //                 ></path>
                //               </svg>
                //               {task?.assignedTo?.fullName}
                //             </span>
                //           )}
                //         </div>
                //       </div>
                //     </div>
                //     <div className="flex items-center space-x-2">
                //       <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                //         <svg
                //           className="w-5 h-5"
                //           fill="none"
                //           stroke="currentColor"
                //           viewBox="0 0 24 24"
                //         >
                //           <path
                //             strokeLinecap="round"
                //             strokeLinejoin="round"
                //             strokeWidth="2"
                //             d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                //           ></path>
                //         </svg>
                //       </button>
                //       <button
                //         onClick={() => deleteTask(task?._id)}
                //         className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                //       >
                //         <svg
                //           className="w-5 h-5"
                //           fill="none"
                //           stroke="currentColor"
                //           viewBox="0 0 24 24"
                //         >
                //           <path
                //             strokeLinecap="round"
                //             strokeLinejoin="round"
                //             strokeWidth="2"
                //             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                //           ></path>
                //         </svg>
                //       </button>
                //     </div>
                //   </div>
                // </div>
                <TaskCard
                  key={task?._id}
                  task={task}
                  onDelete={deleteTask}
                  showAssignedBy={currentOrAssigned === "assigned"}
                  onEdit={() => setSelectedTask(task._id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render modal */}
      {selectedTask && (
        <Edit_Task
          taskId={selectedTask}
          onClose={() => setSelectedTask(null)}
          refreshTask={fetchTask}
        />
      )}
    </>
  );
};

export default Dashboard;

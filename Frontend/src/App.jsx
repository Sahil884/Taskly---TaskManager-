import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Account from "./pages/Account";
import RootLayout from "./pages/RootLayout";
import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import CreateTask from "./pages/CreateTask";
import Edit_Task from "./pages/Edit_Task";
import ProtecedRoute from "./components/ProtecedRoute";

function App() {
  const authenticated = useSelector((state) => state.auth.isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/auth",
          element: authenticated ? <Navigate to="/dashboard" /> : <Signup />,
        },
        {
          path: "/dashboard",
          element: authenticated ? (
            <Dashboard />
          ) : (
            <Navigate to={"/"} replace />
          ),
        },
        {
          path: "/dashboard/account-details",
          element: (
            <ProtecedRoute authenticated={authenticated}>
              <Account />
            </ProtecedRoute>
          ),
        },
        {
          path: "/dashboard/account-details/change-password",
          element: (
            <ProtecedRoute authenticated={authenticated}>
              <ChangePassword />
            </ProtecedRoute>
          ),
        },
        {
          path: "/dashboard/account-details/edit-profile",
          element: (
            <ProtecedRoute authenticated={authenticated}>
              <EditProfile />
            </ProtecedRoute>
          ),
        },
        {
          path: "/dashboard/task",
          element: (
            <ProtecedRoute authenticated={authenticated}>
              <CreateTask />
            </ProtecedRoute>
          ),
        },
        {
          path: "/dashboard/edit-task",
          element: (
            <ProtecedRoute authenticated={authenticated}>
              <Edit_Task />
            </ProtecedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );
}

export default App;

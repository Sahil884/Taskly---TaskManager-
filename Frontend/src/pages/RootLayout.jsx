import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.Backend_URL;

const RootLayout = () => {
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) return;

    const refreshToken = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/users/refresh`
        );
        dispatch(authAction.login());
      } catch (error) {
        console.error("Can't refresh token", error);
        dispatch(authAction.logout()); // clear Redux state
        navigate("/", { replace: true }); // redirect to login
      }
    };
  }, []);
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default RootLayout;

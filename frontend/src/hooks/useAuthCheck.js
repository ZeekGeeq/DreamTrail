//this file is used to make sure the user does lose auth when going to other webpages
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuthCheck = (setIsAuthenticated, setUserInfo) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check",
          { withCredentials: true },
        );
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setUserInfo && setUserInfo(response.data.user);
        } else {
          setIsAuthenticated(false);
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to verify authentication:", error);
        setIsAuthenticated(false);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate, setIsAuthenticated, setUserInfo]);
};

export default useAuthCheck;

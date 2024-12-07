import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Profile.module.css";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await delay(750); //remove this and pfp doesnt load because request times
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check",
          { withCredentials: true },
        );
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setUserInfo(response.data.user);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return isAuthenticated && userInfo ? (
    <div className={`${styles.profileContainer} global-class`}>
      <img
        src={userInfo.photo}
        alt="Profile Picture"
        className={styles.profilePicture}
      />
      <h1 className={styles.greeting}>Hello, {userInfo.displayName}!</h1>
      <p className="global-class">Email: {userInfo.email}</p>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleLogout}
          className={`${styles.button} ${styles.logoutButton}`}
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div>Checking authentication...</div>
  );
};

export default Profile;

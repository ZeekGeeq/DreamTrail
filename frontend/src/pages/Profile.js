import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Profile.module.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/check", { withCredentials: true })
      .then(response => {
        if (response.data.authenticated) { //checks authentication status
          setIsAuthenticated(true);
          setUserInfo(response.data.user);
          console.log("Profile Picture URL:", response.data.user.photo);
        } else {
          navigate('/login');
        }
      })
      .catch(error => {
        console.error("Failed to fetch user profile:", error);
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      window.location.reload();  //force reload for profile navbar refresh
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return isAuthenticated && userInfo ? (
    <div className={`${styles.profileContainer} global-class`}> {/*allows use of global and local style */}
      <img
        src={userInfo.photo}
        alt="Profile Picture"
        className={styles.profilePicture}
      />
      <h1 className={styles.greeting}>Hello, {userInfo.displayName}!</h1>
      <p className="global-class">Email: {userInfo.email}</p> {/*uses global style */}
      <div className={styles.buttonContainer}>
        <a href="/calendar" className={`${styles.button} ${styles.calendarButton}`}>View Calendar Events</a>
        <button onClick={handleLogout} className={`${styles.button} ${styles.logoutButton}`}>Logout</button> {/*logout redirect and handling */}
      </div>
    </div>
  ) : (
    <div>Checking authentication...</div>
  );
};

export default Profile;

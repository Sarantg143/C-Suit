import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import "./TopBar.css";
import defaultProfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";

const TopBar = () => {
  const [userName, setUserName] = useState("User");
  const [userProfilePic, setUserProfilePic] = useState(defaultProfileSVG);

  useEffect(() => {
    // Fetch and set user data for name
    const getUserName = () => {
      try {
        const userDataString = localStorage.getItem("userDataUpdated");
        if (userDataString) {
          const parsedData = JSON.parse(userDataString);
          setUserName(parsedData.name || "User");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserName("User");
      }
    };

    // Fetch and set user profile picture
    const getUserProfilePic = () => {
      try {
        const userDataString = localStorage.getItem("userDataUpdated");
        if (userDataString) {
          const parsedData = JSON.parse(userDataString);
          setUserProfilePic(parsedData.profilePic || defaultProfileSVG);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserProfilePic(defaultProfileSVG);
      }
    };

    // Initial load to get name and profile pic independently
    getUserName();
    getUserProfilePic();

    // Event listeners to handle changes to localStorage
    const handleStorageChange = (e) => {
      if (e.key === "userDataUpdated") {
        if (e.newValue) {
          const updatedData = JSON.parse(e.newValue);
          setUserName(updatedData.name || "User");
          setUserProfilePic(updatedData.profilePic || defaultProfileSVG);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="top-bar">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" placeholder="Search for class, task, etc." />
      </div>
      <div className="user-info">
        <img
          src={userProfilePic}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => {
            e.target.src = defaultProfileSVG;
          }}
        />
        <div className="user-text">
          <span className="welcome-text">Welcome back</span>
          <span className="user-name">{userName}</span>
        </div>
        <div className="notification-icon">
          <FontAwesomeIcon icon={faBell} />
          <span className="notification-dot"></span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

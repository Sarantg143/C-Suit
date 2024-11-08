import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import "./TopBar.css";
import defaultPorfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";

const TopBar = () => {
  const [userData, setUserData] = useState({
    name: "",
    profilePic: ""
  });

  useEffect(() => {
    // Function to get user data from localStorage
    const getUserData = () => {
      try {
        const userDataString = localStorage.getItem("userDataUpdated");
        if (userDataString) {
          const parsedData = JSON.parse(userDataString);
          setUserData({
            name: parsedData.name || "User",
            profilePic: parsedData.profilePic || defaultPorfileSVG
          });
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserData({
          name: "User",
          profilePic: defaultPorfileSVG
        });
      }
    };

    // Initial load
    getUserData();

    // Set up event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "userDataUpdated") {
        getUserData();
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
          src={userData.profilePic}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => {
            e.target.src = defaultPorfileSVG;
          }}
        />
        <div className="user-text">
          <span className="welcome-text">Welcome back</span>
          <span className="user-name">{userData.name}</span>
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
import React, { useState, useEffect } from "react";
import "./Profile.css";
import profileImage from "../Assets/Images/profileImage.jpeg";
import profileBanner from "../Assets/Images/profileBanner.jpg";
import phoneSVG from "../Assets/SVG/phoneSVG.svg";
import mailSVG from "../Assets/SVG/mailSVG.svg";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorDataFetchOverlay from "../Error/ErrorDataFetchOverlay";
import defaultPorfileSVG from "../Assets/SVG/defaultPorfileSVG.svg";
import defaultBannerSVG from "../Assets/SVG/defaultBannerSVG.svg";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    testScore: "",
    idCard: "",
    gender: "",
    profilePic: profileImage,
    profileBanner: profileBanner,
    address: "",
    companyname: "",
    position: "",
    linkedIn: "",
    bio: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      address: "",
    },
  });
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedProfileBanner, setSelectedProfileBanner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchProfileData = async () => {
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      const id = localStorage.getItem("userid");
      
      const response = await axios.get(`${apiBaseUrl}/user/user/${id}`);
      const data = response.data.user;

      // Update localStorage with fresh data from server
      localStorage.setItem("userDataUpdated", JSON.stringify(data));

      // Update user info for course access
      const csuiteUserInfo = {
        userID: data._id,
        coursePurchased: data.coursePurchased?.length ? 
          data.coursePurchased.map((x) => x.courseId) : [],
      };
      localStorage.setItem("userInfo", JSON.stringify(csuiteUserInfo));

      // Handle profile pictures
      const processedData = {
        ...data,
        profilePic: data.profilePic ? 
          (data.profilePic.startsWith("data:image/jpeg;base64,") ? 
            data.profilePic : `data:image/jpeg;base64,${data.profilePic}`) : 
          defaultPorfileSVG,
        profileBanner: data.profileBanner ? 
          (data.profileBanner.startsWith("data:image/jpeg;base64,") ? 
            data.profileBanner : `data:image/jpeg;base64,${data.profileBanner}`) : 
          defaultBannerSVG,
      };

      setProfileData(processedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setFetchError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setProfileData((prevData) => ({
        ...prevData,
        emergencyContact: {
          ...prevData.emergencyContact,
          [field]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      const formData = new FormData();

      // Append all profile data to formData
      Object.entries(profileData).forEach(([key, value]) => {
        if (key === "emergencyContact") {
          Object.entries(value).forEach(([contactKey, contactValue]) => {
            formData.append(`emergencyContact.${contactKey}`, contactValue);
          });
        } else if (key !== "profilePic" && key !== "profileBanner") {
          formData.append(key, value);
        }
      });

      // Handle image uploads
      if (selectedProfileImage) {
        formData.append("profilePic", selectedProfileImage);
      }
      if (selectedProfileBanner) {
        formData.append("profileBanner", selectedProfileBanner);
      }

      const response = await axios.put(
        `${apiBaseUrl}/user/${profileData._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.user) {
        // Update local storage with new data
        localStorage.setItem("userDataUpdated", JSON.stringify(response.data.user));
        
        // Refresh profile data from server
        await fetchProfileData();
        
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveError("Failed to save profile changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedProfileImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profilePic: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileBannerChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedProfileBanner(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          profileBanner: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClassName = (value) => {
    if (value === "" || value === null || value === undefined) {
      return "error-border";
    }
    return "";
  };

  if (fetchError) {
    return <ErrorDataFetchOverlay />;
  }

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="profileContainer">
      {saveError && (
        <div className="error-message">
          {saveError}
        </div>
      )}
      {saveSuccess && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}
      <div className="profileBannerBox">
        <div className="profileBGBox">
          <img
            src={
              profileData?.profileBanner
                ? profileData?.profileBanner
                : defaultBannerSVG
            }
            alt="Banner"
          />
          {isEditing && (
            <label className="custom-file-upload imageBanner">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileBannerChange}
                className="imageBannerUpload"
              />
              Choose File for Profile Banner
            </label>
          )}
        </div>
        <div className="profileHeader">
          <div className="profileImage">
            <img
              src={
                profileData?.profilePic
                  ? profileData?.profilePic
                  : defaultPorfileSVG
              }
              alt="Profile"
              className="defaultImage"
            />
            {isEditing && (
              <label className="custom-file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="imageUpload"
                />
                Choose File
              </label>
            )}
          </div>
          <div className="profileHeaderInfo">
            <h2 className="profileName">{profileData?.name}</h2>
            <p className="profileEmail">{profileData?.email}</p>
          </div>
          <div className="profileEditBtn">
            <button onClick={isEditing ? handleSaveClick : handleEditClick}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
      <div className="profileContent">
        <div className="profileSection">
          <h5>General Information</h5>
          <div className={`${inputClassName(profileData?.name)} profileDetails`}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={`${inputClassName(profileData.gender)} profileDetails`}>
            <label>Gender</label>
            <input
              type="text"
              name="gender"
              value={profileData?.gender}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={`${inputClassName(profileData.idCard)} profileDetails`}>
            <label>ID Card</label>
            <input
              type="text"
              name="idCard"
              value={profileData?.idCard}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={`${inputClassName(profileData.address)} profileDetails`}>
            <label>Address</label>
            <textarea
              name="address"
              value={profileData?.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={`${inputClassName(profileData.testScore)} profileDetails`}>
            <label>Test Score</label>
            <input
              type="number"
              name="testScore"
              value={profileData?.testScore}
              disabled
            />
          </div>
          <div className="profileSeperator"></div>
          <h5>Contact Details</h5>
          <div className={`${inputClassName(profileData.email)} profileDetails profileSPLBox`}>
            <img src={mailSVG} alt="mailSVG" />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData?.email}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className={`${inputClassName(profileData.phoneNumber)} profileDetails profileSPLBox`}>
            <img src={phoneSVG} alt="phoneNumberSVG" />
            <label>Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={profileData?.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="profileSection">
          <h5>Professional Details</h5>
          <div className={`${inputClassName(profileData.companyname)} profileDetails`}>
            <label>Company Name</label>
            <input
              type="text"
              name="companyname"
              value={profileData?.companyname}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={`${inputClassName(profileData.position)} profileDetails`}>
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={profileData?.position}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={`${inputClassName(profileData.linkedIn)} profileDetails`}>
            <label>LinkedIn</label>
            <input
              type="url"
              name="linkedIn"
              value={profileData?.linkedIn}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className={`${inputClassName(profileData.bio)} profileDetails`}>
            <label>Bio</label>
            <textarea
              name="bio"
              value={profileData?.bio}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
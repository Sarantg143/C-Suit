// import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
// import axios from 'axios';

// export async function signinMicrosoft() {
// const auth = getAuth();
 // const provider = new OAuthProvider('microsoft.com');

  // try {
  // const result = await signInWithPopup(auth, provider);
    // const user = result.user;

// const microsoftUserData = {
  //    name: user.displayName,
   //   email: user.email,
    //  socialMediaId: user.uid
     
   // };
   // await saveMicrosoftUser(microsoftUserData);

//  } catch (error) {
 //   console.error("Microsoft Sign-in failed:", error);
  //  if (error.code === 'auth/network-request-failed') {
   //   setTimeout(signinMicrosoft, 1000); 
   // }
 // }
// }

// async function saveMicrosoftUser(data) {
 // try {
//    const response = await axios.post("https://csuite-ui0f.onrender.com/api/user/checks", data);
  //  if (response.data.exists) {
   //   console.log("User signed in:", response.data.user);
    //   localStorage.setItem('user', JSON.stringify(response.data.user));
   // } else {
    //  console.log("New user signed up:", response.data.user);
    //  localStorage.setItem('user', JSON.stringify(response.data.user));
   // }
 // } catch (error) {
  //  console.error("Error checking or saving Microsoft user:", error);
 // }
// }


import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { check, signupCheck } from "../../api/baseapi.js";

const auth = getAuth();
const provider = new OAuthProvider('microsoft.com');

export const signinMicrosoft = async (navigate, Courseid) => {
  let loc = "";
  let result = null; // Declare result outside try-catch for scope accessibility

  try {
    result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Checking if Microsoft user already exists...");
    
    // Check if the user exists in the backend
    const checkResponse = await check({ email: user.email });
    
    if (checkResponse.status === 200) {
      toast.success("User already registered. Logging in...");
      loc = login(checkResponse.data);
      return loc;
    }

  } catch (checkError) {
    if (checkError.response && checkError.response.status === 404) {
      toast.info("User not found. Registering...");

      if (result) {  // Ensure result is available before accessing
        const microsoftUserData = {
          name: result.user.displayName,
          email: result.user.email,
          socialMediaId: result.user.uid
        };

        try {
          const signupResponse = await signupCheck(microsoftUserData);
          console.log("New user signed up:", signupResponse.data);
          loc = login(signupResponse.data);
        } catch (signupError) {
          console.error("Signup error:", signupError);
          toast.error("Signup failed");
        }
      } else {
        console.error("Microsoft sign-in result not available for user data.");
      }

    } else {
      console.error("Error checking Microsoft user:", checkError);
      toast.error("Error checking user");
    }
  }

  return loc;
};

function login(data) {
  const userData = data.user ? data.user : data;

  toast.success("Login Successful!");
  localStorage.setItem("userDataUpdated", JSON.stringify(userData));
  localStorage.setItem("isloggedin", true);
  localStorage.setItem("userid", userData._id);
  localStorage.setItem("name", userData.name);
  localStorage.setItem("email", userData.email);
  localStorage.setItem("linkedin", userData.linkedin);
  localStorage.setItem("elacomplete", userData.elaComplete);

  return userData.elaComplete ? "home" : "quick-assessment";
}

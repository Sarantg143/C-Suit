import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import axios from 'axios';

export async function signinMicrosoft() {
  const auth = getAuth();
  const provider = new OAuthProvider('microsoft.com');

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const microsoftUserData = {
      name: user.displayName,
      email: user.email,
      socialMediaId: user.uid, 
      profilePic: user.photoURL
    };
    await saveMicrosoftUser(microsoftUserData);

  } catch (error) {
    console.error("Microsoft Sign-in failed:", error);
    if (error.code === 'auth/network-request-failed') {
      setTimeout(signinMicrosoft, 1000); 
    }
  }
}

async function saveMicrosoftUser(data) {
  try {
    const response = await axios.post("https://csuite-ui0f.onrender.com/api/user/checks", data);
    if (response.data.exists) {
      console.log("User signed in:", response.data.user);
       localStorage.setItem('user', JSON.stringify(response.data.user));
    } else {
      console.log("New user signed up:", response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
  } catch (error) {
    console.error("Error checking or saving Microsoft user:", error);
  }
}

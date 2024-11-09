import axios from "axios";
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new OAuthProvider("microsoft.com");

export const signinMicrosoft = async () => {
  let result; // Define result outside the try block for scope

  try {
    result = await signInWithPopup(auth, provider);
    const credential = OAuthProvider.credentialFromResult(result);
    // Optionally retrieve tokens if needed
    // const accessToken = credential.accessToken;
    // const idToken = credential.idToken;

    // Send user data to your backend
    await axios.post("https://csuite-ui0f.onrender.com/api/user", {
      name: result.user?.displayName,
      email: result.user?.email,
      authId: result.user?.uid,
    });

    return { result, credential };
  } catch (error) {
    console.error("Microsoft Sign-in failed:", error);
    return { error };
  }
};

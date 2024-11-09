import axios from "axios";
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new OAuthProvider("microsoft.com");

export const signinMicrosoft = async () => {
  const res = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = OAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
      // const idToken = credential.idToken;

      return { result, credential };
    })
    .catch((error) => {
      return error;
    });
 try {
  await axios.post("https://csuite-ui0f.onrender.com/api/user", {
    name: result.user?.displayName,
    email: result.user?.email,
    authId: result.user?.uid,
  });
} catch (error) {
  console.error("Error posting user data:", error.response?.data || error.message);
}

};

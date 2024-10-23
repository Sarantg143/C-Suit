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
  await axios.post("https://csuite-ui0f.onrender.com/api/user/new", {
    name: res?.result?.user?.displayName,
    email: res?.result?.user?.email,
    authId: res?.result?.user?.uid,
  });
  return res;
};

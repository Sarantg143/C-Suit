const clientId = "86zi1t4qeml4hq";
const redirectUri = "https://c-suit.vercel.app/auth-linkedin-bridge";
const state = "linkedIn-auth-state-secret";
const scope = "profile openid email";

export const handleLinkedIn = () => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  window.location.href = authUrl;
};

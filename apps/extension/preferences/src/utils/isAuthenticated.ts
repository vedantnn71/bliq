const isAuthenticated = async () => {
  let isSessionToken = false;
  const cookie = await chrome?.cookies?.get({
    url: "https://bliq.vercel.app/",
    name: "__Secure-next-auth.session-token",
  });

  console.log(typeof cookie?.value);

  if (typeof cookie?.value === "string") {
    isSessionToken = true;
  }

  return isSessionToken;
};

export default isAuthenticated;

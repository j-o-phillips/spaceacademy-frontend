export const getUserProfileFunc = async (auth_token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/learn/user/`,
    {
      headers: {
        Authorization: "Token " + auth_token,
      },
    }
  );
  if (!response.ok) {
    return new Error("An error in the response");
  }

  const result = await response.json();
  return result;
};

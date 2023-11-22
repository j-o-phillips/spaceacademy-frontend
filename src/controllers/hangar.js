export const createHangar = async (authToken, data) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/game/hangars/`,
    {
      method: "POST",
      headers: {
        Authorization: "Token " + authToken,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("An error in the response");
  }

  const result = await response.json();
  return result;
};

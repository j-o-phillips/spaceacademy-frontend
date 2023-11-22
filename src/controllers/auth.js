export const register = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/learn/register/`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          btoa(
            `${import.meta.env.VITE_APP_USER}:${
              import.meta.env.VITE_APP_PASSWORD
            }`
          ),
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

export const login = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/learn/login/`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          btoa(
            `${import.meta.env.VITE_APP_USER}:${
              import.meta.env.VITE_APP_PASSWORD
            }`
          ),
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

export const logout = async (authToken) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/learn/logout/`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${authToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("An error in the response");
  }

  const result = await response.json();
  return result;
};

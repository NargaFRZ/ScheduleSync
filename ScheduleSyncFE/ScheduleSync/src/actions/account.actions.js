import instance from "./axios"; // Axios instance for making HTTP requests

const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await instance.post("/account/register", userData); // POST to /register
    return baseApiResponse(response.data, true); // Return success response
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    return baseApiResponse(error.response?.data || "Server error", false); // Return failure response
  }
};

// Login an existing user
export const loginUser = async (userData) => {
  try {
    const response = await instance.post("/account/login", userData); // POST to /login
    return baseApiResponse(response.data, true); // Return success response
  } catch (error) {
    console.error(
      "Error logging in user:",
      error.response?.data || error.message
    );
    return baseApiResponse(error.response?.data || "Server error", false); // Return failure response
  }
};

export const fetchUserData = async () => {
  try {
    const response = await instance.get("/account/user");
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(
      "Error logging in user:",
      error.response?.data || error.message
    );
    return baseApiResponse(error.response?.data || "Server error", false); // Return failure response
  }
};

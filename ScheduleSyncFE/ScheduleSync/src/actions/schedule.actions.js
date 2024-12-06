import instance from "./axios"; // Axios instance for making HTTP requests

// Helper function to format API responses
const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

// Upload a new schedule
export const uploadSchedule = async (scheduleData) => {
  try {
    const response = await instance.post("/schedule/upload", scheduleData);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error uploading schedule:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

// Update an existing schedule
export const updateSchedule = async (scheduleData) => {
  try {
    const response = await instance.put("/schedule/update", scheduleData);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error updating schedule:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

// Delete a schedule
export const deleteSchedule = async (scheduleID) => {
  try {
    const response = await instance.delete("/schedule/delete", {
      data: { scheduleID },
    });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error deleting schedule:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

// Get schedules for a user
export const getUserSchedules = async (userID) => {
  try {
    const response = await instance.get(`/schedule/user/${userID}`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error fetching user schedules:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

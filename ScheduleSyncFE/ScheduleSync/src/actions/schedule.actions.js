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
    console.log("data fe", scheduleData);
    const response = await instance.post("/schedule/upload", scheduleData);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(
      "Error uploading schedule:",
      error.response?.data || error.message
    );
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

// Update an existing schedule
export const updateSchedule = async (scheduleData) => {
  try {
    const response = await instance.put("/schedule/update", scheduleData);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(
      "Error updating schedule:",
      error.response?.data || error.message
    );
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
    console.error(
      "Error deleting schedule:",
      error.response?.data || error.message
    );
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

// Get schedules by owner
export const getSchedulesByOwner = async (ownerID) => {
  try {
    const response = await instance.get(`/schedule/schedulesByOwner`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(
      "Error fetching schedules by owner:",
      error.response?.data || error.message
    );
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

export const OCRSchedule = async (url) => {
  try {
    const response = await instance.post(
      `http://127.0.0.1:5000/process_schedule`,
      url 
    );
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(
      "Error fetching schedules by owner:",
      error.response?.data || error.message
    );
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

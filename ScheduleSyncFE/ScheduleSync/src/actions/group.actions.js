import instance from "./axios"; // Axios instance for making HTTP requests

// Helper function to format API responses
const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

// Fetch all groups
export const fetchGroupsByUser = async (userID) => {
  try {
    const response = await instance.get(`/group/get-group-user/${userID}`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error fetching groups by user:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

export const fetchGroupsByOwner = async (userID) => {
  try {
    const response = await instance.get(`/group/get-group-owner/${userID}`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error fetching groups by user:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};



// Create a new group
export const createGroup = async (groupData) => {
  try {
    const response = await instance.post("/group/create", groupData);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error creating group:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

// Delete a group
export const deleteGroup = async (groupID) => {
  try {
    const response = await instance.delete("/group/delete", {
      data: { groupID },
    });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error deleting group:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

// Get group members
export const getGroupMembers = async (groupID) => {
  try {
    const response = await instance.get(`/group/get-members/${groupID}`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error fetching group members:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

// Sync schedules for a group
export const syncSchedules = async (groupID) => {
  try {
    const response = await instance.post("/group/sync-schedules", { groupID });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error syncing schedules:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

export const getSyncedSchedule = async (groupID) => {
  try {
    const response = await instance.get(`/group/synced-schedule/${groupID}`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error fetching synced schedule:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};

export const getGroupbyId = async (groupID) => {
  try {
    const response = await instance.get(`/group/get-group/${groupID}`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error fetching synced schedule:", error.response?.data || error.message);
    return baseApiResponse(error.response?.data || "Server error", false);
  }
};


import instance from "./axios";

const baseApiResponse = (data, isSuccess) => {
    return {
      success: isSuccess,
      data: data || null,
    };
  };

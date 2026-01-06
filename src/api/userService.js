import api from "./axiosConfig";

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/user/getalluser");
  return response.data;
};
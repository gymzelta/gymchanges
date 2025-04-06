import axios from "axios";

const API_URL = "https://gym-crm-backend.onrender.com/api/members"; // Adjust the URL if needed

export const getMembers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addMember = async (member) => {
  const res = await axios.post(API_URL, member);
  return res.data;
};

export const deleteMember = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getAllMembers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

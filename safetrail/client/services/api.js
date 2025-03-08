import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

export const submitReport = async (data) => {
  return await axios.post(`${API_URL}/submit`, data);
};

export const getReports = async () => {
  return await axios.get(`${API_URL}/reports`);
};

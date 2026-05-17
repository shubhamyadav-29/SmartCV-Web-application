import axios from "axios";

const API_URL = "http://localhost:5000/api/resumes";


// GET USER RESUMES
export const getUserResumes = async () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const response = await axios.get(
    API_URL,
    config
  );

  return response.data;
};


// DELETE RESUME
export const deleteResume = async (id) => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/${id}`,
    config
  );

  return response.data;
};


// CREATE RESUME
export const createResume = async (resumeData) => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const response = await axios.post(
    API_URL,
    resumeData,
    config
  );

  return response.data;
};
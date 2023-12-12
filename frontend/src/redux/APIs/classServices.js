import Axios from "./Axios";

// Create class API call
export const createClassService = async (classes) => {
  const { data } = await Axios.post("/classes", classes);
  return data.data;
};

// Get class API call
export const getClassesService = async () => {
  const { data } = await Axios.get("/classes");
  return data.data;
};

// Edit class API call
export const editClassService = async (id, classData) => {
  const { data } = await Axios.patch(`/classes/${id}`, classData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// JOIN class API call
export const joinClass = async (id) => {
  const { data } = await Axios.post(`/classes/${id}/attend`);
  return data.data;
};

// Unsub class API call

export const unSubClass = async (id) => {
  const { data } = await Axios.post(`/classes/${id}/leave`);
  return data.data;
};

// delete Class API call

export const deleteClass = async (id) => {
  const { data } = await Axios.delete(`/classes/${id}`);
  return data.data;
};

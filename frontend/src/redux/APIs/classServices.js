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
  const { data } = await Axios.patch(`/classes/${id}`, classData);
  return data.data;
};

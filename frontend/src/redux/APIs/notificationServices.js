import Axios from "./Axios";

export const getNotification = async () => {
  const { data } = await Axios.get("/notifications");
  return data;
};

export const markAsRead = async (id) => {
  const { data } = await Axios.post("/notifications/read/" + id);
  return data;
};

export const markAllAsRead = async () => {
  const { data } = await Axios.post("/notifications//read-all");
  return data;
};

import API from "./api";

export const loginAdmin = async (username, password) => {
  const { data } = await API.post("/admin/login", { username, password });
  return data; // { token, admin: { id, username } }
};

export const registerAdmin = async (username, password) => {
  const { data } = await API.post("/admin/register", { username, password });
  return data;
};

import API from "./api";

export const submitContact = (data) => API.post("/contact", data);

export const getContacts = () => API.get("/contact");

import { client } from "./client";

// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://my-app-ebon-omega.vercel.app";

const UserToken = () => localStorage.getItem("token");

export const config = () => ({
  headers: {
    Authorization: `Bearer ${UserToken()}`,
  },
});

export function loginFun(body) {
  return client.post(`${BASE_URL}/api/login`, body);
}
export function registerUser(body) {
  return client.post(`${BASE_URL}/api/register`, body);
}

export const AddTransactions = (body) => {
  return client.post(`${BASE_URL}/api/manageTransactions`, body, config());
};

export const GetTransactions = () => {
  return client.get(`${BASE_URL}/api/manageTransactions`, config());
};

export const DeleteTransactions = (id) => {
  return client.delete(`${BASE_URL}/api/manageTransactions/${id}`, config());
};

export const updateUserDetails = (user) => {
  return client.patch(`${BASE_URL}/api/user-data`, user, config());
};

export const getUserDetails = () => {
  return client.get(`${BASE_URL}/api/user-data`, config());
};

import axiosInstance from "@/utils/axios";
import { LoginFormData, SignupFormData } from "@/schemas/authSchemas";
import { authKey } from "@/constants/storageKey";
import { removeFromLocalStorage, setToLocalStorage } from "@/helpers/local-storage";

export const signupUser = async (data: SignupFormData) => {
  const payload = {
    username: data.username,
    email: data.email,
    password: data.password,
  };

  const res = await axiosInstance.post("/auth/create-user", payload);
  const token = res?.data?.accessToken;

  if (token) {
    setToLocalStorage(authKey, token);
  }

  return res?.data;
};

export const loginUser = async (data: LoginFormData) => {
  const res = await axiosInstance.post("/auth/login", data);
  const token = res?.data?.accessToken;

  if (token) setToLocalStorage(authKey, token);

  return res?.data;
};

export const logoutUser = () => {
  removeFromLocalStorage(authKey);
  window.location.href = "/";
};

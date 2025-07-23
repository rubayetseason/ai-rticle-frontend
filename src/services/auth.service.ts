import axiosInstance from "@/utils/axios";
import { SignupFormData } from "@/schemas/authSchemas";
import { authKey } from "@/constants/storageKey";
import { setToLocalStorage } from "@/helpers/local-storage";

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

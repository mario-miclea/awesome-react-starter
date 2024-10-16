import { axiosAuth } from '@lib';

export const generateOTP = async () => {
  return await axiosAuth.post(`generate-otp`);
};

export const verifyOTP = async (userId, token) => {
  return await axiosAuth.post(`verify-otp/${userId}`, { token });
};

import { axios, axiosAuth } from '@lib';

export const generateOTP = async () => {
  return await axiosAuth.post('generate-otp');
};

export const verifyOTP = async (userId, token) => {
  return await axiosAuth.post(`verify-otp/${userId}`, { token });
};

export const validateOTP = async (data) => {
  return await axios.post('validate-otp', data);
};

export const disableOTP = async () => {
  return await axiosAuth.post('disable-otp');
};

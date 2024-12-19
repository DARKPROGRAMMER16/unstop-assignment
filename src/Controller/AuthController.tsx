import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

interface LoginCredentials {
  username: string;
  email: string;
  password: string;
}

interface LoginResponse {
  username: string;
  accessToken: string;
  email: string;
  firstName: string;
  gender: string;
}

export const authController = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, credentials);

    console.log({ data });
    return {
      username: data.username,
      accessToken: data.accessToken,
      email: data.email,
      firstName: data.firstName,
      gender: data.gender,
    };
  }
};
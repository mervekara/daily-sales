import { AxiosRequestConfig } from "axios";
import type {
  TokenResponse,
  User,
  UserCredentials,
  UserInformationResponse,
} from "../types/auth";
import { post } from "./api";

export const fetchTokenData = async (
  credentials: UserCredentials
): Promise<TokenResponse> => {
  const { email, password } = credentials;

  const data = {
    Email: email,
    Password: password,
    GrantType: "password",
    Scope: "amazon_data",
    ClientId: "C0001",
    ClientSecret: "SECRET0001",
    RedirectUri: "https://api.eva.guru",
  };

  return post<TokenResponse>("/oauth/token", data);
};

export const fetchUserInformation = async (
  params: User
): Promise<UserInformationResponse> => {
  const { data, accessToken } = params;
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  return post<UserInformationResponse>(
    "/user/user-information",
    { email: data.email },
    config
  );
};

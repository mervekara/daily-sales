import { ActionContext, ActionTree } from "vuex";
import {
  SET_ACCESS_TOKEN,
  SET_USER_INFORMATION,
  type AuthState,
  type User,
  type UserCredentials,
} from "../../types/auth";

import {
  fetchTokenData,
  fetchUserInformation as fetchUserInformationRequest,
} from "../../services/auth";

import type { RootState } from "../types";

const transformStores = (stores: any[]) =>
  stores.map((store) => ({
    marketplace: store.marketplaceName,
    sellerId: store.storeId,
    requestStatus: 0,
    day: 7,
    excludeYoYData: true,
  }));

export const actions: ActionTree<AuthState, RootState> = {
  async login({ commit }, credentials: UserCredentials) {
    try {
      const { Data } = await fetchTokenData(credentials);
      const accessToken = Data?.AccessToken;

      if (!accessToken) {
        throw new Error("Access token not found in response");
      }

      commit(SET_ACCESS_TOKEN, accessToken);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  async fetchUserInformation(
    { commit, state }: ActionContext<AuthState, RootState>,
    email: string
  ) {
    try {
      const accessToken = state.accessToken;

      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      const params: User = {
        data: { email },
        accessToken,
      };

      const { Data } = await fetchUserInformationRequest(params);

      if (!Data?.user?.store?.length) {
        throw new Error("No store data found for user");
      }

      const storesInformation = transformStores(Data.user.store);

      commit(SET_USER_INFORMATION, storesInformation);
    } catch (error) {
      console.error("Error fetching user information:", error);
      throw error;
    }
  },
};

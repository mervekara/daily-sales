import { ActionContext, ActionTree } from "vuex";
import {
  SET_ACCESS_TOKEN,
  SET_USER_INFORMATION,
  User,
  type AuthState,
  type UserCredentials,
} from "../../types/auth";
import { fetchTokenData, fetchUserInformation } from "../../services/auth";
import type { RootState } from "../types";

export const actions: ActionTree<AuthState, RootState> = {
  async login({ commit }, credentials: UserCredentials) {
    try {
      const response = await fetchTokenData(credentials);
      const accessToken = response.Data.AccessToken;

      commit(SET_ACCESS_TOKEN, accessToken);
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  async fetchUserInformation(
    { commit, state }: ActionContext<AuthState, RootState>,
    email: string
  ) {
    try {
      const params: User = {
        data: { email },
        accessToken: state.accessToken ?? "",
      };

      const response = await fetchUserInformation(params);

      const storesInformation = response.Data.user.store.map((store: any) => ({
        marketplace: store.marketplaceName,
        sellerId: store.storeId,
        requestStatus: 0,
        day: 7,
        excludeYoYData: true,
      }));

      commit(SET_USER_INFORMATION, storesInformation);
    } catch (error) {
      console.error("Error fetching user information:", error);

      throw error;
    }
  },
};

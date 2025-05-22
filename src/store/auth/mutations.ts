import {
  AuthState,
  SET_ACCESS_TOKEN,
  SET_USER_INFORMATION,
} from "../../types/auth";
import { MutationTree } from "vuex";

export const mutations: MutationTree<AuthState> = {
  [SET_ACCESS_TOKEN](state, accessToken: string) {
    state.accessToken = accessToken;
  },
  [SET_USER_INFORMATION](state, userInformation) {
    state.userInformation = userInformation;
  },
};

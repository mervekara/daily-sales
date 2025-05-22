import { GetterTree } from "vuex";
import type { AuthState } from "../../types/auth";
import type { RootState } from "../types";

export const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: (state) => !!state.accessToken,
};

import { Module } from "vuex";
import { RootState } from "../types";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { ChartState } from "../../types/chart";

const state: ChartState = {
  chartData: null,
  tableData: [],
};

export const chart: Module<ChartState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};

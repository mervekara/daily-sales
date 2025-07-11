import { ChartState, SET_CHART_DATA, SET_TABLE_DATA } from "../../types/chart";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ChartState> = {
  [SET_CHART_DATA](state, chartData) {
    state.chartData = chartData;
  },
  [SET_TABLE_DATA](state, payload) {
    state.tableData = payload;
  },
};

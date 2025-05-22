import { GetterTree } from "vuex";
import { RootState } from "@/store/types";
import { ChartState } from "@/types/auth";

export const getters: GetterTree<ChartState, RootState> = {
  getChartData: (state) => {
    return state.chartData;
  },
};

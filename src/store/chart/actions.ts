import { ActionTree, ActionContext } from "vuex";
import { RootState } from "../types";

import {
  ChartState,
  DailySalesSkuListItem,
  FetchTableDataPayload,
  SET_CHART_DATA,
  SET_TABLE_DATA,
  SkuRefundRateResponse,
} from "../../types/chart";
import {
  fetchSkuRefundRate as fetchSkuRefundRateRequest,
  fetchChartInformation as fetchChartInformationRequest,
  fetchTableData as fetchTableDataRequest,
} from "../../services/chart";
import { UserInfo } from "../../types/auth";

export const fetchSkuRefundRate = async (
  userInfo: UserInfo,
  rootState: RootState,
  skuList: DailySalesSkuListItem[],
): Promise<SkuRefundRateResponse["Data"]> => {
  try {
    const accessToken = rootState.auth.accessToken;
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const skuRefundRateRequest = {
      marketplace: userInfo.marketplace,
      sellerId: userInfo.sellerId,
      skuList,
      requestedDay: 0,
    };

    const response = await fetchSkuRefundRateRequest(
      skuRefundRateRequest,
      accessToken,
    );

    return response.Data;
  } catch (error) {
    console.error("Error fetching SKU refund rate for user:", userInfo, error);
    throw error;
  }
};

export const actions: ActionTree<ChartState, RootState> = {
  async fetchChartInformation({ commit, rootState }, payload) {
    try {
      const chartData = [];
      console.log("Fetching chart information...", payload);
      const userInformation = rootState.auth.userInformation;

      for (const userInfo of userInformation) {
        if (!rootState.auth.accessToken) {
          throw new Error("Access token is missing");
        }

        const chartRequestData = {
          marketplace: userInfo.marketplace,
          sellerId: userInfo.sellerId,
          requestStatus: userInfo.requestStatus,
          day: payload ? payload.days : userInfo.day,
          excludeYoYData: userInfo.excludeYoYData,
        };

        const response = await fetchChartInformationRequest(
          chartRequestData,
          rootState.auth.accessToken,
        );

        if (response.Data.item.length > 0) {
          chartData.push(response.Data.item);
        }
      }

      commit(SET_CHART_DATA, chartData.flat());
    } catch (error) {
      console.error("Error fetching chart information:", error);
      throw error;
    }
  },

  async fetchTableData(
    { commit, rootState }: ActionContext<ChartState, RootState>,
    payload: FetchTableDataPayload,
  ) {
    try {
      if (!rootState.auth.accessToken) {
        throw new Error("Access token is missing");
      }
      const userInformation = rootState.auth.userInformation;
      const { columns, pageNumber } = payload;
      const tableData = [];
      for (const userInfo of userInformation) {
        const chartRequestData = {
          isDaysCompare: columns.length === 2 ? 1 : 0,
          marketplace: userInfo.marketplace,
          sellerId: userInfo.sellerId,
          salesDate: columns[0].date,
          salesDate2: columns.length === 2 ? columns[1].date : columns[0].date,
          pageSize: 5,
          pageNumber: pageNumber,
        };

        const response = await fetchTableDataRequest(
          chartRequestData,
          rootState.auth.accessToken,
        );

        const skuRefundRate = await fetchSkuRefundRate(
          userInfo,
          rootState,
          response.Data.item.skuList,
        );
        tableData.push(skuRefundRate);
      }

      commit(SET_TABLE_DATA, tableData.flat());

      return tableData.flat();
    } catch (error) {
      console.error("Error fetching table data:", error);
      throw error;
    }
  },
};

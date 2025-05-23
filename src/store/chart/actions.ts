import { ActionTree, ActionContext } from "vuex";
import { RootState } from "../types";

import {
  ChartState,
  DailySalesSkuListItem,
  DEFAULT_PAGE_SIZE,
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

const ensureAccessToken = (accessToken: string | null | undefined): string => {
  if (!accessToken) throw new Error("Access token is missing");
  return accessToken;
};

const validateUserInformation = (
  userInfo: UserInfo[] | null | undefined
): UserInfo[] => {
  if (!Array.isArray(userInfo) || userInfo.length === 0) {
    throw new Error("User information is missing or invalid");
  }
  return userInfo;
};

const fetchChartDataForUser = async (
  userInfo: UserInfo,
  accessToken: string,
  day: number
) => {
  const requestData = {
    marketplace: userInfo.marketplace,
    sellerId: userInfo.sellerId,
    requestStatus: userInfo.requestStatus,
    day,
    excludeYoYData: userInfo.excludeYoYData,
  };

  const response = await fetchChartInformationRequest(requestData, accessToken);
  return response?.Data?.item || [];
};

const fetchSkuRefundRate = async (
  userInfo: UserInfo,
  accessToken: string,
  skuList: DailySalesSkuListItem[]
): Promise<SkuRefundRateResponse["Data"]> => {
  const request = {
    marketplace: userInfo.marketplace,
    sellerId: userInfo.sellerId,
    skuList,
    requestedDay: 0,
  };

  const response = await fetchSkuRefundRateRequest(request, accessToken);
  return response.Data;
};

export const actions: ActionTree<ChartState, RootState> = {
  async fetchChartInformation({ commit, rootState }, payload) {
    try {
      const accessToken = ensureAccessToken(rootState.auth.accessToken);
      const userInformation = validateUserInformation(
        rootState.auth.userInformation
      );
      const days = payload?.days;

      const chartData = await Promise.all(
        userInformation.map((user) =>
          fetchChartDataForUser(user, accessToken, days ?? user.day)
        )
      );

      commit(SET_CHART_DATA, chartData.flat());
    } catch (error) {
      console.error("Error fetching chart information:", error);
      throw error;
    }
  },

  async fetchTableData(
    { commit, rootState }: ActionContext<ChartState, RootState>,
    payload: FetchTableDataPayload
  ) {
    try {
      const accessToken = ensureAccessToken(rootState.auth.accessToken);
      const userInformation = validateUserInformation(
        rootState.auth.userInformation
      );
      const { columns, pageNumber } = payload;
      const [salesDate, salesDate2] =
        columns.length === 2
          ? [columns[0].date, columns[1].date]
          : [columns[0].date, columns[0].date];

      const tableData = await Promise.all(
        userInformation.map(async (user) => {
          const requestData = {
            isDaysCompare: columns.length === 2 ? 1 : 0,
            marketplace: user.marketplace,
            sellerId: user.sellerId,
            salesDate,
            salesDate2,
            pageSize: DEFAULT_PAGE_SIZE,
            pageNumber,
          };

          const response = await fetchTableDataRequest(
            requestData,
            accessToken
          );
          const skuList = response?.Data?.item?.skuList ?? [];

          return fetchSkuRefundRate(user, accessToken, skuList);
        })
      );

      const flatData = tableData.flat();
      commit(SET_TABLE_DATA, flatData);
      return flatData;
    } catch (error) {
      console.error("Error fetching table data:", error);
      throw error;
    }
  },
};

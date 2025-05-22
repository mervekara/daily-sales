import { AxiosRequestConfig } from "axios";
import { post } from "./api";
import {
  DailySalesOverviewResponse,
  DailySalesSkuListResponse,
  SkuRefundRateResponse,
} from "../types/chart";

export const fetchSkuRefundRate = async (
  params: object,
  accessToken: string
): Promise<SkuRefundRateResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  return post<SkuRefundRateResponse>(
    "/data/get-sku-refund-rate",
    params,
    config
  );
};

export const fetchChartInformation = async (
  params: object,
  accessToken: string
): Promise<DailySalesOverviewResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  return post<DailySalesOverviewResponse>(
    "/data/daily-sales-overview",
    params,
    config
  );
};

export const fetchTableData = async (
  params: object,
  accessToken: string
): Promise<DailySalesSkuListResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  return post<DailySalesSkuListResponse>(
    "/data/daily-sales-sku-list/",
    params,
    config
  );
};

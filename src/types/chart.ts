import { UserInfo } from "./auth";

export interface SkuRefundRateRequest {
  marketplace: string;
  sellerId: string;
  skuList: string[];
  requestedDay: number;
}

export interface RefundRateItem {
  sku: string;
  refundRate: number;
  refundCount: number;
  orderCount: number;
}

export interface DailySalesOverviewItem {
  date: string;
  amount: number;
  orderCount: number;
  unitCount: number;
  avgSalesPrev30Days: number;
  prevYearDate: string;
  prevYearAmount: number;
  prevYearOrderCount: number;
  prevYearUnitCount: number;
  prevYearAvgSalesPrev30Days: number;
  profit: number;
  yoy30DailySalesGrowth: number;
  acos: number;
}

export interface DailySalesSkuListItem {
  sku: string;
  productName: string;
  qty: number;
  shippingAmount: number;
  refundPercantage: number;
  qty2: number;
  amount2: number;
}

export interface SkuRefundRateResponse {
  Data: {
    item: RefundRateItem[];
  };
}

export interface DailySalesOverviewResponse {
  Data: {
    item: DailySalesOverviewItem[];
  };
}

export interface DailySalesSkuListResponse {
  Data: {
    item: {
      skuList: DailySalesSkuListItem[];
    };
  };
}

export interface ChartRequestData {
  marketplace: string;
  sellerId: string;
  requestStatus: string;
  day: number;
  excludeYoYData: boolean;
}

export interface ChartResponse {
  date: string;
  sales: number;
  revenue: number;
}

export interface FetchChartInformationParams {
  users: UserInfo[];
  accessToken: string;
  days?: number;
}

export interface FetchTableDataPayload {
  columns: any[];
  pageNumber: number | 1;
}

export interface ChartDataItem {
  date: string;
  profit?: number;
  fbaAmount?: number;
  fbmAmount?: number;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface TokenResponse {
  Data: {
    AccessToken: string;
  };
}

export interface UserInformationResponse {
  Data: {
    user: {
      store: UserInfo[];
    };
  };
}

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_USER_INFORMATION = "SET_USER_INFORMATION";

export interface User {
  data: {
    email: string;
  };
  accessToken: string;
}

export interface UserInfo {
  email?: string;
  marketplace: string;
  sellerId: string;
  requestStatus: string;
  day: number;
  excludeYoYData: boolean;
}

export interface AuthState {
  accessToken: string | null;
  userInformation: UserInfo[];
}

export interface AuthGetters {
  isAuthenticated: boolean;
}

export const SET_CHART_DATA = "SET_CHART_DATA";
export const SET_TABLE_DATA = "SET_TABLE_DATA";

export interface ChartState {
  chartData: ChartData | null;
  tableData: any[];
}

export interface ChartData {
  series: ChartSeries[];
  categories: string[];
}

export interface ChartSeries {
  name: string;
  data: number[];
}

export interface FetchTableDataPayload {
  columns: any[];
  pageNumber: number | 1;
}

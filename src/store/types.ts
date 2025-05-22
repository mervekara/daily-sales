import { AuthState } from "../types/auth";
import { ChartState } from "../types/chart";

export interface RootState {
  version: string;
  auth: AuthState;
  chart: ChartState;
}

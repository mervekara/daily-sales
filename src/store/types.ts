import { AuthState, ChartState } from "@/types/auth";

export interface RootState {
  version: string;
  auth: AuthState;
  chart: ChartState;
}

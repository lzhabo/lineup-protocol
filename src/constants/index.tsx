import { mainnetTokens } from "@src/constants/mainnetConfig";
import { testnetTokens } from "@src/constants/testnetConfig";

export const TOKENS = {
  W: mainnetTokens,
  T: testnetTokens,
};

export const ROUTES = {
  ROOT: "/",
  INVEST: "/invest",
  INVEST_DAYS: "/invest/:days",
  DASHBOARD: "/dashboard",
};

export type TChainId = "W" | "T";

export interface IToken {
  assetId: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
}

import { mainnetTokens } from "@src/constants/mainnetConfig";
import { testnetTokens } from "@src/constants/testnetConfig";

export const TOKENS = {
  W: mainnetTokens,
  T: testnetTokens,
};

export const ROUTES = {
  ROOT: "/",
  INVEST: "/invest",
  NFT: "/nft",
};

export type TChainId = "W" | "T";

export interface IToken {
  assetId: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
}

import tokenLogos from "@src/assets/tokens/tokenLogos";
import { IToken } from "@src/constants";
import BN from "@src/utils/BN";

export interface IAssetBalance extends Omit<IToken, "logo"> {
  balance?: BN;
  usdnEquivalent?: BN;
  logo?: string;
}

class Balance implements IAssetBalance {
  public readonly assetId: string;
  public readonly name: string;
  public readonly symbol: string;
  public readonly decimals: number;
  private readonly _logo?: string;
  public readonly balance?: BN;
  public readonly usdnEquivalent?: BN;

  constructor(props: IAssetBalance) {
    this.name = props.name;
    this.assetId = props.assetId;
    this.symbol = props.symbol;
    this.decimals = props.decimals;
    this._logo = props.logo;
    this.balance = props.balance;
    this.usdnEquivalent = props.usdnEquivalent;
  }

  get logo() {
    return this._logo ?? tokenLogos[this.symbol] ?? tokenLogos.UNKNOWN;
  }

  get formatBalance() {
    return BN.formatUnits(this.balance ?? 0, this.decimals).toFormat(2) ?? "—";
  }
  get formatUsdnEquivalent() {
    return this.usdnEquivalent
      ? `~ ${this.usdnEquivalent?.toFormat(2)} $`
      : "—";
  }
}
export default Balance;

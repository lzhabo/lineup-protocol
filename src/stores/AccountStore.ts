import RootStore from "@stores/RootStore";
import { Signer } from "@waves/signer";
import { action, makeAutoObservable } from "mobx";
import { getCurrentBrowser } from "@src/utils/getCurrentBrowser";
import Balance from "@src/entities/Balance";

export enum LOGIN_TYPE {
  TRUST_WALLET = "TRUST_WALLET",
  METAMASK = "METAMASK",
}

export interface IInvokeTxParams {
  dApp: string;
  payment: Array<{ assetId: string; amount: string }>;
  call: {
    function: string;
    args: Array<{ type: "integer" | "string"; value: string }>;
  };
}

export interface ISerializedAccountStore {
  address: string | null;
  loginType: LOGIN_TYPE | null;
}

class AccountStore {
  public readonly rootStore: RootStore;

  chainId: "W" | "T" = "W";

  isWavesKeeperInstalled = false;
  @action.bound setWavesKeeperInstalled = (state: boolean) =>
    (this.isWavesKeeperInstalled = state);

  loginModalOpened: boolean = false;
  @action.bound setLoginModalOpened = (state: boolean) =>
    (this.loginModalOpened = state);

  walletModalOpened: boolean = false;
  @action.bound setWalletModalOpened = (state: boolean) =>
    (this.walletModalOpened = state);

  changePoolModalOpened: boolean = false;
  @action.bound setChangePoolModalOpened = (state: boolean) =>
    (this.changePoolModalOpened = state);

  public assetBalances: Balance[] = [];
  @action.bound setAssetBalances = (assetBalances: Balance[]) =>
    (this.assetBalances = assetBalances);

  findBalanceByAssetId = (assetId: string) =>
    this.assetBalances.find((balance) => balance.assetId === assetId);

  public address: string | null = null;
  @action.bound setAddress = (address: string | null) =>
    (this.address = address);

  public loginType: LOGIN_TYPE | null = null;
  @action.bound setLoginType = (loginType: LOGIN_TYPE | null) =>
    (this.loginType = loginType);

  public signer: Signer | null = null;
  @action.bound setSigner = (signer: Signer | null) => (this.signer = signer);

  constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    if (this.isBrowserSupportsWavesKeeper) {
      // this.setupWavesKeeper();
    }

    if (initState) {
      this.setLoginType(initState.loginType);
      this.setAddress(initState.address);
    }
  }

  get isBrowserSupportsWavesKeeper(): boolean {
    const browser = getCurrentBrowser();
    return ["chrome", "firefox", "opera", "edge"].includes(browser);
  }

  login = async (loginType: LOGIN_TYPE) => {
    this.setLoginType(loginType);
    const loginData = await this.signer?.login();
    this.setAddress(loginData?.address ?? null);
  };

  logout() {
    this.setAddress(null);
    this.setLoginType(null);
  }

  serialize = (): ISerializedAccountStore => ({
    address: this.address,
    loginType: this.loginType,
  });
}

export default AccountStore;

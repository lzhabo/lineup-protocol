import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";
import Web3 from "web3";

export enum LOGIN_TYPE {
  TRUST_WALLET = "TRUST_WALLET",
  METAMASK = "METAMASK",
}

export interface ISerializedAccountStore {}

class AccountStore {
  public readonly rootStore: RootStore;
  web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  address: string | null = null;
  setAddress = (address: string) => (this.address = address);
  constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.web3.eth.getAccounts().then((accounts) => {
      if (accounts.length > 0) this.metamaskLogin();
    });
  }

  metamaskLogin = async () => {
    const accounts = await this.web3.eth.requestAccounts();
    this.setAddress(accounts[0] ?? null);
  };

  serialize = (): ISerializedAccountStore => ({});
}

export default AccountStore;

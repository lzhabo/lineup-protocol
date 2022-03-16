import { makeAutoObservable, when } from "mobx";
import AccountStore, { ISerializedAccountStore } from "@stores/AccountStore";
import InvestStore from "@stores/InvestStore";

export interface ISerializedRootStore {
  accountStore?: ISerializedAccountStore;
}

export type TPoolStats = {
  apy: number;
  fees: number;
  liquidity: number;
  monthly_volume: number;
  volume: { date: number; volume: number }[];
};

export default class RootStore {
  public accountStore: AccountStore;
  public investStore: InvestStore;

  constructor(initState?: ISerializedRootStore) {
    this.accountStore = new AccountStore(this, initState?.accountStore);
    this.investStore = new InvestStore(this);
    makeAutoObservable(this);
    when(
      () => this.accountStore.installed,
      () => Promise.all([this.investStore.sync()])
    );
  }

  serialize = (): ISerializedRootStore => ({
    accountStore: this.accountStore.serialize(),
  });
}

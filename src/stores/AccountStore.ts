import RootStore from "@stores/RootStore";
import Account from "@src/entities/Account";

export interface IAccountStoreInitState {}

export default class AccountStore {
  public rootStore: RootStore;

  account1: Account;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    //нафига?
    this.account1 = new Account(this.rootStore);
  }
}

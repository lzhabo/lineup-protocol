import { makeAutoObservable } from "mobx";
import { RootStore } from "@stores";

class Account {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
}

export default Account;

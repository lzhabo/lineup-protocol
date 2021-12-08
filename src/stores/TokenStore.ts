import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";

export interface ITokenStoreInitState {
  // userTokens: TTokenList;
}

class TokenStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore, initState?: ITokenStoreInitState) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
}

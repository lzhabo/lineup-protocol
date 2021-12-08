import { RouterStore } from "./index";
import { makeAutoObservable } from "mobx";
import SettingsStore, { ISettingsStoreInitState } from "@stores/SettingsStore";
import { ITokenStoreInitState } from "@stores/TokenStore";

export interface ISerializedStore {
  tokenStore: ITokenStoreInitState;
  settingsStore: ISettingsStoreInitState;
}

export default class RootStore {
  routerStore = new RouterStore(this);
  settingsStore = new SettingsStore(this);

  constructor() {
    makeAutoObservable(this);
  }
}

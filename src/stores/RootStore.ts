import { RouterStore } from "./index";
import { makeAutoObservable } from "mobx";
import SettingsStore from "@stores/SettingsStore";

export default class RootStore {
  routerStore = new RouterStore(this);
  settingsStore = new SettingsStore(this);

  constructor() {
    makeAutoObservable(this);
    // Promise.all([this.cardStore.sync(), this.touchesStore.sync()]).then();
  }
}

import { RootStore } from "./index";

export enum Language {
  EN = "EN",
  RU = "RU",
}

export default class SettingsStore {
  public rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.language = navigator.language.includes("ru")
      ? Language.RU
      : Language.EN;
  }

  language: Language = Language.RU;
}

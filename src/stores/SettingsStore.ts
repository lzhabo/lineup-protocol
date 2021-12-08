import { RootStore } from "./index";

export enum LANGUAGE {
  EN = "EN",
  RU = "RU",
}

export enum THEME {
  LIGHT_THEME = "lightTheme",
  DARK_THEME = "darkTheme",
}

export interface ISettingsStoreInitState {
  selectedLanguage?: LANGUAGE;
  selectedTheme: THEME;
}

export default class SettingsStore {
  public rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.language = navigator.language.includes("ru")
      ? LANGUAGE.RU
      : LANGUAGE.EN;
  }

  language: LANGUAGE = LANGUAGE.RU;
}

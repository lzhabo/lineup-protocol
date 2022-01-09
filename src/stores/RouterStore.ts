import { RootStore } from "./index";
import { createBrowserHistory, Location } from "history";
import { makeAutoObservable, runInAction } from "mobx";

export enum ROUTES {
  ROOT = "/",
  TEST = "/test",
}

export default class RouterStore {
  public rootStore: RootStore;
  public history = createBrowserHistory();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.history.listen(({ location }) => this.sync(location));
    this.sync(this.history.location);
    makeAutoObservable(this);
  }

  currentPath: ROUTES = ROUTES.ROOT;

  searchParams = new URLSearchParams();

  sync = (location: Location) => {
    runInAction(() => {
      this.currentPath = location.pathname as any;
      this.searchParams = new URLSearchParams(location.search);
    });
  };
}

import { RootStore } from "./index";
import { createBrowserHistory, Location } from "history";
import { runInAction } from "mobx";

export enum ROUTES {
  ROOT = "/",
}

export default class RouterStore {
  public rootStore: RootStore;
  public history = createBrowserHistory();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.history.listen(({ location }) => this.sync(location));
    this.sync(this.history.location);
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

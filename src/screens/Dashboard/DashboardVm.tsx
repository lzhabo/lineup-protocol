import React, { useMemo } from "react";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { useVM } from "@src/utils/useVm";
import BN from "@src/utils/BN";
import { sleep } from "@src/utils/sleep";

const ctx = React.createContext<DashboardVm | null>(null);

export const DashboardVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new DashboardVm(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useDashboardVM = () => useVM(ctx);

class DashboardVm {
  public rootStore: RootStore;

  loading: boolean = false;
  private _setLoading = (l: boolean) => (this.loading = l);

  totalProfit: BN | null = null;
  totalLocked: BN | null = null;

  get totalValue() {
    return BN.ZERO;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.sync();
  }

  sync = async () => {
    await sleep(2000);
    this.totalProfit = BN.ZERO;
    this.totalLocked = BN.ZERO;
  };
}

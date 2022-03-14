import React, { useMemo } from "react";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { useVM } from "@src/utils/useVm";

const ctx = React.createContext<InvestVm | null>(null);

export const InvestVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new InvestVm(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useInvestVM = () => useVM(ctx);

class InvestVm {
  public rootStore: RootStore;

  loading: boolean = false;
  private _setLoading = (l: boolean) => (this.loading = l);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}

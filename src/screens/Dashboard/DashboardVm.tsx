import React, { useMemo } from "react";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { useVM } from "@src/utils/useVm";
import BN from "@src/utils/BN";
import { Contract } from "@ethersproject/contracts";
import { investBoxAddress } from "@stores/InvestStore";
import moneyBoxAbi from "@src/constants/moneyBoxAbi.json";

const ctx = React.createContext<DashboardVm | null>(null);

export const DashboardVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new DashboardVm(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

interface IBox {
  id: string;
}

export const useDashboardVM = () => useVM(ctx);

class DashboardVm {
  public rootStore: RootStore;

  loading: boolean = false;
  private _setLoading = (l: boolean) => (this.loading = l);

  boxes: IBox[] = [];
  private setBoxes = (boxes: IBox[]) => (this.boxes = boxes);

  totalProfit: BN | null = null;
  totalLocked: BN | null = null;

  get totalValue() {
    return this.totalProfit && this.totalLocked
      ? this.totalProfit.plus(this.totalLocked)
      : BN.ZERO;
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.sync().catch();
  }

  //todo
  sync = async () => {
    const { provider, address } = this.rootStore.accountStore;
    const locksIds = this.rootStore.investStore.locks?.map(({ id }) => id);
    if (provider == null || address == null || locksIds == null) return;
    const contr = new Contract(investBoxAddress, moneyBoxAbi, provider);
    const boxIds: string[] = await contr.getBoxList(address);
    const boxes: IBox[] = await Promise.all(
      boxIds.map(async (id) => contr.getBoxData(id, address))
    );
    this.setBoxes(boxes);

    this.totalProfit = BN.ZERO;
    this.totalLocked = BN.ZERO;
  };

  reinvest = async (boxId: string) => {
    const box = this.boxes.find((box) => box.id === boxId);
    if (box == null) return;
    const { signer } = this.rootStore.accountStore;
    if (signer == null) return;
    const contr = new Contract(investBoxAddress, moneyBoxAbi, signer);
    await contr.reinvest(boxId);
    await this.sync().catch();
    await this.rootStore.accountStore.syncBalances();
  };
  withdraw = async (boxId: string) => {
    const box = this.boxes.find((box) => box.id === boxId);
    if (box == null) return;
    const { signer, address } = this.rootStore.accountStore;
    if (signer == null || address == null) return;
    const contr = new Contract(investBoxAddress, moneyBoxAbi, signer);
    await contr.claim(boxId, address);
    await this.sync().catch();
    await this.rootStore.accountStore.syncBalances();
  };
}

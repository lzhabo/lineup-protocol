import React, { useMemo } from "react";
import { makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import { useVM } from "@src/utils/useVm";
import BN from "@src/utils/BN";
import { Contract } from "@ethersproject/contracts";
import { investBoxAddress, lnpAddress } from "@stores/InvestStore";
import moneyBoxAbi from "@src/constants/moneyBoxAbi.json";
import tokens from "@src/constants/tokens.json";
import tokenAbi from "@src/constants/erc20Abi.json";
import { toast } from "react-toastify";

const ctx = React.createContext<DashboardVm | null>(null);

export const DashboardVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new DashboardVm(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export enum BOX_STATUS {
  DEFAULT,
  ONGOING,
  CLAIMED,
  REVERTED,
}

export interface IBox {
  id: string;
  investedAmount: BN;
  lockId: string;
  lockedUntil: BN;
  status: BOX_STATUS;
  token: string;
}

export const useDashboardVM = () => useVM(ctx);

class DashboardVm {
  public rootStore: RootStore;

  loading: boolean = false;
  private setLoading = (l: boolean) => (this.loading = l);

  boxes: IBox[] = [];
  private setBoxes = (boxes: IBox[]) => (this.boxes = boxes);

  totalProfit: BN | null = null;
  private setTotalProfit = (totalProfit: BN) =>
    (this.totalProfit = totalProfit);
  totalLocked: BN | null = null;
  private setTotalLocked = (totalLocked: BN) =>
    (this.totalLocked = totalLocked);
  totalValue: BN | null = null;
  private setTotalValue = (totalValue: BN) => (this.totalValue = totalValue);
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    when(
      () =>
        this.rootStore.accountStore.address != null &&
        this.rootStore.accountStore.provider != null &&
        this.rootStore.investStore.locks != null &&
        this.rootStore.investStore.locks.length > 0,
      this.sync
    );
    setInterval(() => this.sync(), 10000);
  }

  get activeBoxes() {
    return this.boxes.filter(({ status }) => status === BOX_STATUS.ONGOING);
  }

  sync = async () => {
    const { provider, address } = this.rootStore.accountStore;
    const locks = this.rootStore.investStore.locks;
    if (provider == null || address == null || locks == null) return;
    const contr = new Contract(investBoxAddress, moneyBoxAbi, provider);
    const boxIds: BN[] = await contr.userOwned(address);
    const boxes: IBox[] = await Promise.all(
      boxIds.map(async (id) => {
        const box = await contr.getBoxData(address, id);
        return {
          ...box,
          investedAmount: new BN(box.investedAmount.toString()),
          lockedUntil: new BN(box.lockedUntil.toString()),
          id: id.toString(),
        };
      })
    );
    this.setBoxes(boxes);

    const tokenContract = new Contract(lnpAddress, tokenAbi, provider);
    const token = tokens.find(({ address }) => address === lnpAddress);
    const totalLocked = await tokenContract.totalSupply();

    let totalProfit = BN.ZERO;
    let totalValue = BN.ZERO;

    this.activeBoxes.forEach(({ lockId, investedAmount: a }) => {
      const lock = locks.find(({ id }) => id === lockId);
      const token = tokens.find(({ address }) => address === lock?.token);

      const amount = BN.formatUnits(new BN(a.toString()), token?.decimals);
      const profit = amount.times((lock?.basePercent ?? 0) / 100);

      totalProfit = totalProfit.plus(profit);
      totalValue = totalValue.plus(profit).plus(amount);
    });

    this.setTotalLocked(
      BN.formatUnits(totalLocked.toString(), token!.decimals)
    );
    this.setTotalProfit(totalProfit);
    this.setTotalValue(totalValue);
  };

  reinvest = async (boxId: string) => {
    const box = this.boxes.find((box) => box.id === boxId);
    const { signer, address } = this.rootStore.accountStore;
    if (box == null || signer == null || address == null) return;
    this.setLoading(true);
    try {
      const contr = new Contract(investBoxAddress, moneyBoxAbi, signer);
      const tx = await contr.reinvest(boxId);
      await tx.wait();
      await this.sync();
      await this.rootStore.accountStore.syncBalances();
    } catch (e: any) {
      toast(e.message ?? e.toString(), { type: "error" });
    }
    this.setLoading(false);
  };

  withdraw = async (boxId: string) => {
    const box = this.boxes.find((box) => box.id === boxId);
    const { signer, address } = this.rootStore.accountStore;
    if (box == null || signer == null || address == null) return;
    this.setLoading(true);
    try {
      const contr = new Contract(investBoxAddress, moneyBoxAbi, signer);
      const tok = new Contract(lnpAddress, tokenAbi, signer);
      const allowance = await tok.allowance(address, investBoxAddress);
      if (box.investedAmount.gt(allowance.toString())) {
        const res = await tok.approve(
          investBoxAddress,
          box.investedAmount.toString()
        );
        await res.wait();
      }
      const tx = await contr.claim(boxId, address);
      await tx.wait();
      await this.sync();
      await this.rootStore.accountStore.syncBalances();
    } catch (e: any) {
      toast(e.message ?? e.toString(), { type: "error" });
    }
    this.setLoading(false);
  };
}

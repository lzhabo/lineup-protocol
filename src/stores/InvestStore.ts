import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";
import { Contract } from "@ethersproject/contracts";
import moneyBoxAbi from "@src/constants/moneyBoxAbi.json";

export const investBoxAddress = "0x21C38B25Df2553CeFA5edEcBDFfa6E868f7d563B";
export const tokenAddress = "0x155e5a920f4d2d18F942FF46022f959148cEA378";
export const lnpAddress = "0x98932eb833C20e6f85469af8F2Cc7215353C7F5A";
interface ILock {
  basePercent: string;
  lockPeriod: string;
  status: boolean;
  id: string;
}

export class Lock {
  readonly contract: string;
  readonly token: string;
  private readonly _basePercent: string;
  private readonly _lockPeriod: string;
  readonly id: string;
  readonly status: boolean;
  get lockPeriod() {
    return +this._lockPeriod;
  }
  get lockPeriodDays() {
    return (+this._lockPeriod / 60 / 60 / 24).toFixed(0);
  }
  get basePercent() {
    return +this._basePercent / 100;
  }
  constructor(lock: ILock, contract: string, token: string) {
    this.id = lock.id;
    this._basePercent = lock.basePercent;
    this._lockPeriod = lock.lockPeriod;
    this.status = lock.status;
    this.token = token;
    this.contract = contract;
  }
}

class InvestStore {
  public readonly rootStore: RootStore;

  locks: Lock[] | null = null;
  private setLocks = (locks: Lock[]) => (this.locks = locks);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  sync = async () => {
    try {
      const provider = this.rootStore.accountStore.provider;
      if (provider == null) return;
      const contr = new Contract(
        investBoxAddress,
        moneyBoxAbi as any,
        provider
      );
      const lockIds: string[] = await contr.getLockList();
      const locks: Lock[] = await Promise.all(
        lockIds.map(async (id) => {
          const lock: ILock = await contr.getLockData(id);
          return new Lock({ ...lock, id }, investBoxAddress, tokenAddress);
        })
      );
      this.setLocks(
        locks.sort((a, b) => (a.lockPeriod < b.lockPeriod ? 1 : -1))
      );
    } catch (e) {}
  };
}
export default InvestStore;

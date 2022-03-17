import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";
import abi from "@src/constants/moneyBoxAbi.json";

const investBoxAddress = "0xB69ae48A6B55a7Ad4D2421B9ed8fA10E645EC3e6";
const tokenAddress = "0x651fe7a1c87CF429B3F6AF4becB5bCCf712F85EF";

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
    const web3 = this.rootStore.accountStore.web3;
    const tokenContract: any = new web3.eth.Contract(
      abi as any,
      investBoxAddress
    );
    const lockIds: string[] = await tokenContract.methods.getLockList().call();
    const locks: Lock[] = await Promise.all(
      lockIds.map(async (id) => {
        const lock: ILock = await tokenContract.methods.getLockData(id).call();
        return new Lock({ ...lock, id }, investBoxAddress, tokenAddress);
      })
    );
    this.setLocks(locks.sort((a, b) => (a.lockPeriod < b.lockPeriod ? 1 : -1)));
  };
}
export default InvestStore;

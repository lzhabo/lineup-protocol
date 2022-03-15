import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";
import abi from "@src/constants/moneyBoxAbi.json";

const investBoxAddress = "0xB69ae48A6B55a7Ad4D2421B9ed8fA10E645EC3e6";

interface ILock {
  basePercent: number;
  lockPeriod: number;
  status: boolean;
  id: string;
}

class InvestStore {
  public readonly rootStore: RootStore;

  locks: ILock[] | null = null;
  private setLocks = (locks: ILock[]) => (this.locks = locks);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.sync();
  }

  sync = async () => {
    const web3 = this.rootStore.accountStore.web3;
    const tokenContract: any = new web3.eth.Contract(
      abi as any,
      investBoxAddress
    );
    const lockIds: string[] = await tokenContract.methods.getLockList().call();
    const locks: ILock[] = await Promise.all(
      lockIds.map(async (id) => {
        const lock = await tokenContract.methods.getLockData(id).call();
        return {
          basePercent: +lock.basePercent,
          lockPeriod: +lock.lockPeriod,
          status: lock.status,
          id,
        };
      })
    );
    this.setLocks(locks.sort((a, b) => (a.lockPeriod < b.lockPeriod ? 1 : -1)));
  };
}
export default InvestStore;

import React, { useMemo } from "react";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { useVM } from "@src/utils/useVm";
import { matchPath } from "react-router-dom";
import { ROUTES } from "@src/constants";
import { Lock } from "@stores/InvestStore";
import { TBalance } from "@stores/AccountStore";
import BN from "@src/utils/BN";

const ctx = React.createContext<InvestCardDaysVm | null>(null);

export const InvestCardVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new InvestCardDaysVm(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useInvestCardVM = () => useVM(ctx);

class InvestCardDaysVm {
  public rootStore: RootStore;
  loading: boolean = false;
  private setLoading = (l: boolean) => (this.loading = l);

  amount: BN = BN.ZERO;
  setAmount = (amount: BN) => (this.amount = amount);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  //todo add deposit
  deposit = async () => {
    // const { web3, address } = this.rootStore.accountStore;
    // const { token: tokenAddress, contract: boxAddress } = this.lock!;
    // const { Contract } = web3.eth;
    // const contract = new Contract(abi as any, boxAddress, { from: address! });
    // const tokenContract = new Contract(tokenAbi as any, tokenAddress, {
    //   from: address!,
    // });
    // const allowance = await tokenContract.methods
    //   .allowance(address, boxAddress)
    //   .call();
    // console.log({ allowance });
    // if (this.amount.gte(allowance)) {
    //   console.log("хуй");
    //   const res = await tokenContract.methods
    //     .approve(boxAddress, this.amount.toString())
    //     .call();
    //   console.log(res);
    // }
    // console.log(this.amount.toString(), this.lock?.id);
    // await contract.methods.invest(this.amount.toString(), this.lock?.id).call();
  };

  get balance(): TBalance | null {
    const { balances } = this.rootStore.accountStore;
    if (balances.length === 0 || this.lock == null) return null;
    return balances.find(({ address }) => address === this.lock!.token) ?? null;
  }
  get lock(): Lock | null {
    const { locks } = this.rootStore.investStore;
    const match = matchPath(ROUTES.INVEST_CARD, window.location.pathname);
    return locks?.find(({ id }) => id === match?.params.id) ?? null;
  }
  get profitString() {
    return BN.formatUnits(this.amount, this.balance?.decimals ?? 18)
      .times(this.lock?.basePercent ?? 0)
      .div(100)
      .toFormat(2);
  }
  get balanceString() {
    return BN.formatUnits(this.amount, this.balance?.decimals).toFormat(2);
  }
  get disabled() {
    return (
      this.lock == null ||
      this.balance == null ||
      this.amount.eq(0) ||
      this.amount.gt(this.balance?.amount ?? BN.ZERO)
    );
  }
}

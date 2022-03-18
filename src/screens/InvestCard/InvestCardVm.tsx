import React, { useMemo } from "react";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { useVM } from "@src/utils/useVm";
import { matchPath } from "react-router-dom";
import { ROUTES } from "@src/constants";
import { Lock } from "@stores/InvestStore";
import { TBalance } from "@stores/AccountStore";
import BN from "@src/utils/BN";
import { Contract } from "@ethersproject/contracts";
import abi from "@src/constants/moneyBoxAbi.json";
import tokenAbi from "@src/constants/erc20Abi.json";
import tokens from "@src/constants/tokens.json";
import { toast } from "react-toastify";
import {
  buildSuccessInvestDialogParams,
  IDialogNotificationProps,
} from "@components/Dialog/DialogNotification";

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

  public notificationParams: IDialogNotificationProps | null = null;
  public setNotificationParams = (params: IDialogNotificationProps | null) =>
    (this.notificationParams = params);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  deposit = async () => {
    const { provider, signer, address } = this.rootStore.accountStore;
    if (signer == null || address == null || provider == null) return;
    this.setLoading(true);
    try {
      const { token: tokenAddress, contract: boxAddress } = this.lock!;
      const contr = new Contract(boxAddress, abi, signer);
      const tok = new Contract(tokenAddress, tokenAbi, signer);
      const allowance = await tok.allowance(address, boxAddress);
      if (this.amount.gt(allowance.toString())) {
        const res = await tok.approve(boxAddress, this.amount.toString());
        await res.wait();
      }
      await contr.invest(this.amount.toString(), this.lock?.id);
      await this.rootStore.accountStore.syncBalances();
      this.setNotificationParams(
        buildSuccessInvestDialogParams({
          amount: BN.formatUnits(this.amount, this.balance?.decimals)
            .toFormat(0)
            .concat(` ${this.balance?.symbol}`),
        })
      );
      this.setAmount(BN.ZERO);
    } catch (e: any) {
      toast(e.message ?? e.toString(), { type: "error" });
    }
    this.setLoading(false);
  };

  get balance(): TBalance | null {
    const { balances } = this.rootStore.accountStore;
    if (balances.length === 0 || this.lock == null) return null;
    const token = tokens.find(({ address }) => address === this.lock!.token);
    const balance = balances.find(
      ({ address }) => address === this.lock!.token
    );
    if (token == null) return null;
    return balance != null ? balance : { ...token, amount: BN.ZERO };
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

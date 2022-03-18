import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import { Column } from "@components/Flex";
import Button from "@components/Button";
import LockInfo from "@screens/InvestCard/LockInfo";
import TokenInput from "@components/TokenInput";
import BN from "@src/utils/BN";
import { observer } from "mobx-react-lite";
import { useInvestCardVM } from "@screens/InvestCard/InvestCardVm";
import DialogNotification from "@components/Dialog/DialogNotification";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 100%;
  width: 100%;
  @media (min-width: 880px) {
    max-width: 480px;
  }
`;
const LockDetails = styled(Column)`
  box-sizing: border-box;
  padding: 0 24px;
`;
const AmountToLock: React.FC<IProps> = () => {
  const vm = useInvestCardVM();

  return (
    <Root>
      <TokenInput
        amount={vm.amount}
        setAmount={vm.setAmount}
        decimals={vm.balance?.decimals ?? 18}
        balance={vm.balance?.amount ?? BN.ZERO}
        symbol={vm.balance?.symbol ?? ""}
      />
      <SizedBox height={26} />
      <LockDetails crossAxisSize="max">
        <LockInfo name="APY" value={`${vm.lock?.basePercent ?? 0}%`} />
        <LockInfo
          name="Profit"
          value={`~ ${vm.profitString} ${vm.balance?.symbol}` ?? "–"}
        />
        <LockInfo name="Unlock" value="21/04/22, 13:37" borderless />
      </LockDetails>
      <SizedBox height={24} />
      <Button fixed onClick={vm.deposit} disabled={vm.disabled}>
        {vm.amount.eq(0)
          ? "Enter amount to lock"
          : `Lock ${vm.balanceString} ${vm.balance?.symbol}`}
      </Button>
      <DialogNotification
        onClose={() => vm.setNotificationParams(null)}
        title={vm.notificationParams?.title ?? ""}
        description={vm.notificationParams?.description}
        buttonsDirection={vm.notificationParams?.buttonsDirection}
        type={vm.notificationParams?.type}
        buttons={vm.notificationParams?.buttons}
        style={{ maxWidth: 400 }}
        visible={vm.notificationParams != null}
      />
    </Root>
  );
};
export default observer(AmountToLock);

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
import Loading from "@components/Loading";
import dayjs from "dayjs";
import DialogNotification from "@components/Dialog/DialogNotification";
import { useStores } from "@stores";

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
  const { accountStore } = useStores();
  const unlock = vm.lock?.lockPeriod
    ? dayjs().add(vm.lock?.lockPeriod, "seconds").format("DD/MM/YY, hh:mm")
    : "–";
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
          value={
            vm.balance?.symbol
              ? `~ ${vm.profitString} ${vm.balance?.symbol}`
              : "–"
          }
        />
        <LockInfo name="Unlock" value={unlock} borderless />
      </LockDetails>
      <SizedBox height={24} />
      {accountStore.address == null && (
        <Button
          style={{ borderRadius: 26 }}
          fixed
          onClick={() => accountStore.setLoginModalOpened(true)}
          disabled={!accountStore.installed}
        >
          Connect wallet
        </Button>
      )}
      {accountStore.address != null && (
        <Button
          style={{ borderRadius: 26 }}
          fixed
          onClick={!vm.disabled ? vm.deposit : undefined}
          disabled={vm.disabled}
        >
          {vm.loading ? (
            <Loading />
          ) : vm.amount.eq(0) ? (
            "Enter amount to lock"
          ) : vm.balance != null && vm.balance.amount.gte(vm.amount) ? (
            `Lock ${vm.balanceString} ${vm.balance?.symbol}`
          ) : (
            "Insufficient balance"
          )}
        </Button>
      )}
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

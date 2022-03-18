import React, { useMemo } from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@components/Flex";
import Divider from "@components/Divider";
import Card from "@components/Card";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import {
  BOX_STATUS,
  IBox,
  useDashboardVM,
} from "@screens/Dashboard/DashboardVm";
import BN from "@src/utils/BN";
import tokens from "@src/constants/tokens.json";
import { useStores } from "@stores";
import Loading from "@components/Loading";
import dayjs from "dayjs";
interface IProps {
  box: IBox;
}

const Status = styled.div<{ locked?: boolean }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  padding: 4px 12px;
  color: ${({ locked }) => (locked ? "#ffffff" : "#7ce34f")};
  background: ${({ locked }) => (locked ? "#3B3B46" : "#2a352a")};
  border-radius: 14px;
`;
const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > * {
    margin-bottom: 16px;
    width: 100%;
  }
  & > :last-child {
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    & > * {
      margin-bottom: 0;
      width: fit-content;
      margin-right: 24px;
    }
    & > :last-child {
      margin-bottom: 0;
    }
  }
`;

const TextButton = styled.button`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #767eff;
  transition: 0.4s;
  cursor: pointer;
  background: transparent;
  outline: none;
  border: none;
  box-shadow: none;
  padding: 0;
  :hover {
    color: #fff;
  }
  :disabled {
    color: #747489;
    cursor: not-allowed;
  }
`;

const DepositCard: React.FC<IProps> = ({ box }) => {
  const vm = useDashboardVM();
  const { investStore } = useStores();
  const lock = investStore.locks?.find(({ id }) => id === box.lockId);
  const token = tokens.find(({ address }) => address === lock?.token);

  const locked = BN.formatUnits(box.investedAmount.toString(), token?.decimals);
  const profit = BN.formatUnits(
    box.investedAmount.times((lock?.basePercent ?? 0) / 100),
    token?.decimals
  );
  const unlock = dayjs.unix(+box.lockedUntil.toString());
  const idLocked = dayjs().isBefore(unlock);
  const data = useMemo(
    () => [
      { name: "Locked", value: `${locked} ${token?.symbol}` },
      { name: "APY", value: `${lock?.basePercent}%` },
      { name: "Profit", value: `${profit} ${token?.symbol}` },
      { name: "Unlock", value: unlock.format("DD/MM/YY, hh:mm") },
    ],
    [lock, locked, profit, token?.symbol, unlock]
  );
  const actions = [
    { title: "Deposit again", onClick: () => vm.reinvest(box.id) },
    { title: "Withdraw", onClick: () => vm.withdraw(box.id) },
    // { title: "Emergency unlock", onClick: () => null, disabled: true },
  ];
  if (lock == null || token == null) return <Loading />;
  return (
    <Card style={{ marginBottom: 16 }}>
      <Row alignItems="center">
        <Text fitContent>{lock.lockPeriodDays}-day Deposit</Text>
        <SizedBox width={16} />
        {box.status === BOX_STATUS.ONGOING && (
          <Status locked={idLocked}> {idLocked ? "Locked" : "Unlocked"}</Status>
        )}
      </Row>
      <SizedBox height={24} />
      <Info>
        {data.map(({ name, value }) => (
          <Column crossAxisSize="max" key={value}>
            <Text type="secondary" size="medium">
              {name}
            </Text>
            <Text>{value}</Text>
          </Column>
        ))}
      </Info>
      <SizedBox height={24} />
      <Divider />
      <SizedBox height={14} />
      <ActionsWrapper>
        {!vm.loading ? (
          actions.map(({ title, ...rest }, i) => (
            <TextButton key={i} {...rest}>
              {title}
            </TextButton>
          ))
        ) : (
          <TextButton>
            {" "}
            <Loading style={{ color: "#fff" }} />
          </TextButton>
        )}
      </ActionsWrapper>
    </Card>
  );
};
export default observer(DepositCard);

import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@components/Flex";
import Divider from "@components/Divider";
import Card from "@components/Card";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { useDashboardVM } from "@screens/Dashboard/DashboardVm";

interface IProps {
  boxId: string;
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

const DepositCard: React.FC<IProps> = ({ boxId }) => {
  const vm = useDashboardVM();
  const data = [
    { name: "Locked", value: "$99,999.99" },
    { name: "APY", value: "14.88%" },
    { name: "Profit", value: "$999.99" },
    { name: "Unlock", value: "21/04/22, 13:37" },
  ];
  const actions = [
    { title: "Deposit again", onClick: () => vm.reinvest(boxId) },
    { title: "Withdraw", onClick: () => vm.withdraw(boxId) },
    { title: "Emergency unlock", onClick: () => null, disabled: true },
  ];
  return (
    <Card style={{ marginBottom: 16 }}>
      <Row alignItems="center">
        <Text fitContent>7-day Deposit</Text>
        <SizedBox width={16} />
        <Status locked>Unlocked</Status>
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
        {actions.map(({ title, ...rest }, i) => (
          <TextButton key={i} {...rest}>
            {title}
          </TextButton>
        ))}
      </ActionsWrapper>
    </Card>
  );
};
export default observer(DepositCard);

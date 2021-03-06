import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import waves from "@src/assets/images/waves.svg";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Column } from "@src/components/Flex";
import { useDashboardVM } from "@screens/Dashboard/DashboardVm";
import BN from "@src/utils/BN";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: url(${waves}) bottom right #565cbf;
  background-size: cover;
  padding: 27px 16px;
  border-radius: 16px 16px 0 0;

  @media (min-width: 768px) {
    padding: 24px 32px;
  }
`;
const Bottom = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #1f1e25;
  border-radius: 0 1px 16px 16px;
  @media (min-width: 768px) {
    padding: 24px 32px;
  }
`;
const TvlTitle = styled.div`
  color: #ffffff;
  font-size: 26px;
  line-height: 34px;
  font-weight: 600;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 40px;
    line-height: 56px;
  }
`;
const TotalValue: React.FC<IProps> = () => {
  const vm = useDashboardVM();

  return (
    <Root>
      <Top>
        <Text size="medium">Total Value Locked</Text>
        <SizedBox height={8} />
        <TvlTitle>${(vm.totalLocked ?? BN.ZERO).toFormat(2)}</TvlTitle>
      </Top>
      <SizedBox height={2} />
      <Bottom>
        <Column
          crossAxisSize="max"
          style={{ marginRight: 40 }}
          justifyContent="space-between"
          mainAxisSize="stretch"
        >
          <Text type="secondary">Total value</Text>
          <Text size="medium">${vm.totalValue?.toFormat(2)}</Text>
        </Column>
        <Column
          crossAxisSize="max"
          justifyContent="space-between"
          mainAxisSize="stretch"
        >
          <Text type="secondary">Total profit</Text>
          <Text size="medium">${(vm.totalProfit ?? BN.ZERO).toFormat(2)}</Text>
        </Column>
      </Bottom>
    </Root>
  );
};
export default observer(TotalValue);

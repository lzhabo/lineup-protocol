import styled from "@emotion/styled";
import React from "react";
import Text from "@src/components/Text";
import SizedBox from "@components/SizedBox";
import { useStores } from "@stores";
import LoggOutInvestments from "@screens/Dashboard/Investments/LoggOutInvestments";
import LoggInInvestments from "@screens/Dashboard/Investments/LoggInInvestments";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Investments: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  return (
    <Root>
      <Text weight={600} size="title">
        My Investments
      </Text>
      <SizedBox height={16} />
      {accountStore.address == null ? (
        <LoggOutInvestments />
      ) : (
        <LoggInInvestments />
      )}
    </Root>
  );
};
export default observer(Investments);

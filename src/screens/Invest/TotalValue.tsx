import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import waves from "@src/assets/images/waves.svg";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Column } from "@src/components/Flex";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: url(${waves}) bottom right;
  background-size: cover;
  padding: 24px 32px;
  border-radius: 16px 16px 0 0;
`;
const Bottom = styled.div`
  display: flex;
  padding: 24px 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #1f1e25;
  border-radius: 0px 1px 16px 16px;
`;
const TotalValue: React.FC<IProps> = () => {
  return (
    <Root>
      <Top>
        <Text size="large">Total Value</Text>
        <SizedBox height={8} />
        <Text size="large" weight={600}>
          $99,999.99
        </Text>
      </Top>
      <SizedBox height={2} />
      <Bottom>
        <Column crossAxisSize="max">
          <Text type="secondary">Total value locked</Text>
          <Text weight={500}>$99,999.99</Text>
        </Column>
        <Column crossAxisSize="max">
          <Text type="secondary">Total profit</Text>
          <Text>$99,999.99 (+14.88%)</Text>
        </Column>
      </Bottom>
    </Root>
  );
};
export default observer(TotalValue);

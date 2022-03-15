import styled from "@emotion/styled";
import React, { useState } from "react";
import Card from "@components/Card";
import Divider from "@components/Divider";
import SizedBox from "@components/SizedBox";
import { Row } from "@components/Flex";
import Text from "@components/Text";
import Button from "@components/Button";
import LockInfo from "@screens/InvestDays/LockInfo";
import TokenInput from "@components/TokenInput";
import BN from "@src/utils/BN";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 100%;
  min-height: 100%;
  margin-bottom: 24px;
  margin-top: 40px;
  @media (min-width: 880px) {
    margin-top: 56px;
    max-width: 480px;
  }
`;

const AmountToLock: React.FC<IProps> = () => {
  const [v, setV] = useState<BN>(BN.ZERO);
  return (
    <Root>
      <Card>
        <TokenInput amount={v} setAmount={setV} decimals={18} />
        <SizedBox height={8} />
        <Divider />
        <SizedBox height={8} />
        <Row justifyContent="space-between">
          <Text type="secondary" fitContent>
            Balance: 1,230.49502
          </Text>
          <Text fitContent type="purple">
            25% 50% 75% 100%
          </Text>
        </Row>
      </Card>
      <SizedBox height={26} />
      <LockInfo name="Approx. profit" value="$999.99" />
      <LockInfo name="Unlock" value="21/04/22, 13:37" />
      <LockInfo name="Transaction fee" value="$12.34" />
      <SizedBox height={24} />
      <Button fixed> Enter amount to lock</Button>
    </Root>
  );
};
export default AmountToLock;

import styled from "@emotion/styled";
import React, { useState } from "react";
import SizedBox from "@components/SizedBox";
import { Column } from "@components/Flex";
import Button from "@components/Button";
import LockInfo from "@screens/InvestCard/LockInfo";
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
  //min-height: 100%;
  @media (min-width: 880px) {
    max-width: 480px;
  }
`;
const LockDetails = styled(Column)`
  box-sizing: border-box;
  padding: 0 24px;
`;
const AmountToLock: React.FC<IProps> = () => {
  const [v, setV] = useState<BN>(BN.ZERO);
  const balance = BN.parseUnits(12.33, 6);

  return (
    <Root>
      <TokenInput
        amount={v}
        setAmount={setV}
        decimals={6}
        balance={balance}
        symbol="$"
      />
      <SizedBox height={26} />
      <LockDetails crossAxisSize="max">
        <LockInfo name="Approx. profit" value="$999.99" />
        <LockInfo name="Unlock" value="21/04/22, 13:37" />
        <LockInfo name="Transaction fee" value="$12.34" />
      </LockDetails>
      <SizedBox height={24} />
      <Button
        fixed
        onClick={() => console.log(v.toString())}
        disabled={v.eq(0) || v.gt(balance)}
      >
        Enter amount to lock
      </Button>
    </Root>
  );
};
export default AmountToLock;

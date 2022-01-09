import styled from "@emotion/styled";
import React from "react";
import { Row } from "@components/Flex";
import TokenSelect from "@components/TokenInput/TokenSelect";
import BigNumberInput from "@components/BigNumberInput";
import BN from "@src/utils/BN";
import AmountInput from "@components/TokenInput/AmountInput";
import SizedBox from "@components/SizedBox";

interface IProps {
  divided?: boolean;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #0b0b0d;
  box-sizing: border-box;
  margin: 8px 0;
`;
const TokenInput: React.FC<IProps> = ({ divided }) => {
  return (
    <Root>
      <Row alignItems="center" justifyContent="space-between">
        <TokenSelect />
        <SizedBox width={8} />
        <BigNumberInput
          decimals={18}
          renderInput={(props, ref) => <AmountInput {...props} ref={ref} />}
          value={new BN(1.12).times(1e18)}
          onChange={(n) => null}
        />
      </Row>
      {divided ? <Divider /> : <SizedBox height={8} />}
    </Root>
  );
};
export default TokenInput;

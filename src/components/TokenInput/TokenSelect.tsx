import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as Btc } from "@src/assets/images/bitcoin.svg";
import { ReactComponent as Arrow } from "@src/assets/icons/arrowDown.svg";
import { Row } from "../Flex";

interface IProps {}

const Root = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  max-width: 160px;
  width: 100%;
  padding: 8px;
  background: #0b0b0d;
  border-radius: 20px;
  box-sizing: border-box;
`;

const TokenName = styled.div`
  font-family: Poppins, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
`;

const TokenSelect: React.FC<IProps> = () => {
  return (
    <Root>
      <Row alignItems="center">
        <Btc style={{ borderRadius: "50%", marginRight: 8 }} />
        <TokenName>BTC</TokenName>
      </Row>
      <Arrow style={{ justifySelf: "flex-end", marginRight: 12 }} />
    </Root>
  );
};
export default TokenSelect;

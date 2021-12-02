import styled from "@emotion/styled";
import React from "react";
import { Row } from "@components/flex";
import TokenSelect from "@components/TokenInput/TokenSelect";

interface IProps {}

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
const TokenInput: React.FC<IProps> = () => {
  return (
    <Root>
      <Row>
        <TokenSelect />
      </Row>
      <Divider />
    </Root>
  );
};
export default TokenInput;

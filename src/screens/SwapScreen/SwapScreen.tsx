import styled from "@emotion/styled";
import React from "react";
import TokenInput from "@components/TokenInput";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 96px;
  max-width: 560px;
  box-sizing: border-box;
  padding: 32px;
  border-radius: 8px;
  background: #1f1e25;
`;

const SwapScreen: React.FC<IProps> = () => {
  return (
    <Root>
      <TokenInput />
    </Root>
  );
};
export default SwapScreen;

import styled from "@emotion/styled";
import React from "react";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;

  height: 40px;
  width: 160px;
  padding: 8px;
  background: #0b0b0d;
  border-radius: 20px;
  box-sizing: border-box;
`;

const TokenSelect: React.FC<IProps> = () => {
  return <Root></Root>;
};
export default TokenSelect;

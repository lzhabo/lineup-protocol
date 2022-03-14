import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  font-weight: 500;
  background: #666de3;
  border-radius: 20px;
  cursor: pointer;
`;

const ConnectWalletButton: React.FC<IProps> = ({ ...rest }) => {
  return <Root {...rest}>Connect wallet</Root>;
};
export default ConnectWalletButton;

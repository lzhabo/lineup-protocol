import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as Logo } from "@src/assets/images/bigLogo.svg";
import ConnectWalletButton from "@components/Header/ConnectWalletButton";
import Tabs from "@components/Tabs/Tabs";

interface IProps {}

const Root = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;

const Header: React.FC<IProps> = () => {
  return (
    <Root>
      <Logo style={{ height: 36 }} />
      <Tabs />
      <ConnectWalletButton />
    </Root>
  );
};
export default Header;

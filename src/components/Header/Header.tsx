import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as Logo } from "@src/assets/images/bigLogo.svg";
import ConnectWalletButton from "@components/Header/ConnectWalletButton";
import Tabs from "@components/Tabs/Tabs";
import { Link } from "react-router-dom";
import { ROUTES } from "@stores/RouterStore";

interface IProps {}

const Root = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  max-width: calc(1280px + 16px + 16px);
`;
const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  text-decoration: none;
  margin-right: 8px;
`;

const Header: React.FC<IProps> = () => {
  return (
    <Root>
      <LogoLink to={ROUTES.ROOT}>
        <Logo style={{ marginRight: 8 }} />
        AYE Protocol
      </LogoLink>
      <Tabs />
      <ConnectWalletButton />
    </Root>
  );
};
export default Header;

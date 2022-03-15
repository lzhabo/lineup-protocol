import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as Logo } from "@src/assets/images/bigLogo.svg";
import { observer } from "mobx-react-lite";
import Wallet from "@components/Wallet/Wallet";

interface IProps {}

const Root = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 20px;
  align-items: center;
  max-width: calc(1160px + 32px);
  justify-content: space-between;
  color: white;
`;

const Header: React.FC<IProps> = () => {
  return (
    <Root>
      <Logo style={{ height: 36 }} />
      <Wallet />
    </Root>
  );
};
export default observer(Header);

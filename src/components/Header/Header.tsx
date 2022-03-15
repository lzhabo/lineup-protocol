import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as Logo } from "@src/assets/images/bigLogo.svg";
import { observer } from "mobx-react-lite";
import Wallet from "@components/Wallet/Wallet";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@src/constants";

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
  const navigate = useNavigate();
  return (
    <Root>
      <Logo
        style={{ height: 36, cursor: "pointer" }}
        onClick={() => navigate(ROUTES.DASHBOARD)}
      />
      <Wallet />
    </Root>
  );
};
export default observer(Header);

import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as Logo } from "@src/assets/images/bigLogo.svg";
import Tabs from "../Tabs/Tabs";
import ConnectWalletButton from "./ConnectWalletButton";
import Button from "@components/Button";
import { useStores } from "@stores";
import { observer } from "mobx-react-lite";
import Wallet from "@components/Wallet/Wallet";
import SwitchButtons from "../SwitchButtons";
import { ROUTES } from "@src/constants";
import { useNavigate } from "react-router-dom";

interface IProps {}

const Root = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const Header: React.FC<IProps> = () => {
  const navigate = useNavigate();
  const activeTab = ROUTES.NFT.includes(window.location.pathname) ? 1 : 0;
  return (
    <Root>
      <Logo style={{ height: 36 }} />
      <SwitchButtons
        values={["Invest", `Nft`]}
        active={activeTab}
        onActivate={(i) => {
          i === 1 ? navigate(ROUTES.NFT) : navigate(ROUTES.INVEST);
        }}
      />
      <Wallet />
    </Root>
  );
};
export default observer(Header);

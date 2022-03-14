import styled from "@emotion/styled";
import React from "react";
import { useStores } from "@stores";
import { observer } from "mobx-react-lite";
import LoginModal from "./LoginModal";
import LoggedInAccountInfo from "@components/Wallet/LoggedInAccountInfo";
import ConnectWalletButton from "@components/Header/ConnectWalletButton";

interface IProps {}

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wallet: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;

  return (
    <Root>
      {address == null ? (
        <ConnectWalletButton
          onClick={() => accountStore.setLoginModalOpened(true)}
        />
      ) : (
        <LoggedInAccountInfo />
      )}
      <LoginModal
        visible={accountStore.loginModalOpened}
        onLogin={(loginType) => accountStore.login(loginType)}
        onClose={() => accountStore.setLoginModalOpened(false)}
      />
    </Root>
  );
};
export default observer(Wallet);

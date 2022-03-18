import styled from "@emotion/styled";
import React from "react";
import { useStores } from "@stores";
import { observer } from "mobx-react-lite";
import LoginModal from "./LoginModal";
import LoggedInAccountInfo from "@components/Wallet/LoggedInAccountInfo";
import Button from "@components/Button";

interface IProps {}

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wallet: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  return (
    <Root>
      {accountStore.address != null ? (
        <LoggedInAccountInfo address={accountStore.address} />
      ) : (
        <Button
          size="medium"
          onClick={() => accountStore.setLoginModalOpened(true)}
        >
          Connect wallet
        </Button>
      )}
      <LoginModal
        visible={accountStore.loginModalOpened}
        onClose={() => accountStore.setLoginModalOpened(false)}
      />
    </Root>
  );
};
export default observer(Wallet);

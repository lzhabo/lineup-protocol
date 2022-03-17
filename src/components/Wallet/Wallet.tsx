import styled from "@emotion/styled";
import React, { useState } from "react";
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
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  return (
    <Root>
      {accountStore.address != null ? (
        <LoggedInAccountInfo address={accountStore.address} />
      ) : (
        <Button onClick={() => setLoginModalOpened(true)}>
          Connect wallet
        </Button>
      )}
      <LoginModal
        visible={loginModalOpened}
        onClose={() => setLoginModalOpened(false)}
      />
    </Root>
  );
};
export default observer(Wallet);

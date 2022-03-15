import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useStores } from "@stores";
import { observer } from "mobx-react-lite";
import LoginModal from "./LoginModal";
import LoggedInAccountInfo from "@components/Wallet/LoggedInAccountInfo";
import { useWeb3React } from "@web3-react/core";

import { InjectedConnector } from "@web3-react/injected-connector";
import Button from "@components/Button";
import Web3 from "web3";
import accountStore from "@stores/AccountStore";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

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

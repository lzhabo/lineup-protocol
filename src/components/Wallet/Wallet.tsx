import styled from "@emotion/styled";
import React from "react";
import { useStores } from "@stores";
import { observer } from "mobx-react-lite";
import LoginModal from "./LoginModal";
import LoggedInAccountInfo from "@components/Wallet/LoggedInAccountInfo";
import { useWeb3React } from "@web3-react/core";

import { InjectedConnector } from "@web3-react/injected-connector";
import Button from "@components/Button";

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
  const { active, account, activate } = useWeb3React();
  const handleConnect = async () => {
    await activate(injected);
    console.log(account);
  };

  const { accountStore } = useStores();
  const { address } = accountStore;
  console.log(address);

  return (
    <Root>
      {active != null ? (
        <LoggedInAccountInfo />
      ) : (
        <Button onClick={handleConnect}>Connect wallet</Button>
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

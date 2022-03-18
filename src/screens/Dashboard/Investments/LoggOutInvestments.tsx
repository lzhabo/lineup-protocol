import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import { ReactComponent as Wallet } from "@src/assets/images/wallet.svg";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { useStores } from "@stores";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoggOutInvestments: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  return (
    <Root>
      <Card
        justifyContent="center"
        alignItems="center"
        style={{ padding: "38px 0px" }}
      >
        <Wallet style={{ height: 56, width: 56 }} />
        <SizedBox height={8} />
        <Text type="secondary" fitContent>
          Connect your wallet to see deposits
        </Text>
      </Card>
      <SizedBox height={16} />
      <Button fixed onClick={() => accountStore.setLoginModalOpened(true)}>
        Connect Wallet
      </Button>
    </Root>
  );
};
export default LoggOutInvestments;

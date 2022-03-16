import styled from "@emotion/styled";
import React from "react";
import Text from "@src/components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { ReactComponent as Plus } from "@src/assets/icons/plus.svg";
import { ReactComponent as DepositsIcon } from "@src/assets/icons/deposits.svg";
import Card from "@components/Card";
import { useStores } from "@stores";
import { Link } from "react-router-dom";
import { ROUTES } from "@src/constants";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotificationCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 16px;
  padding: 38px !important;
`;

const LoggInInvestments: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  return (
    <Root>
      <Text weight={600} size="title">
        My Investments
      </Text>
      <SizedBox height={24} />
      <NotificationCard>
        <DepositsIcon />
        <SizedBox height={8} />
        <Text type="secondary">Connect your wallet to see deposits</Text>
      </NotificationCard>
      {/*{Array.from({ length: 2 }).map((_, i) => (*/}
      {/*  <DepositCard key={i} />*/}
      {/*))}*/}
      {accountStore.address == null ? (
        <Button onClick={accountStore.metamaskLogin} fixed>
          Connect wallet
        </Button>
      ) : (
        <Link to={ROUTES.INVEST}>
          <Button fixed>
            <Plus />
            <SizedBox width={8} />
            Invest
          </Button>
        </Link>
      )}
    </Root>
  );
};
export default observer(LoggInInvestments);

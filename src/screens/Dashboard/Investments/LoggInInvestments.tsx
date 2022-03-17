import styled from "@emotion/styled";
import React from "react";
import Text from "@src/components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { ReactComponent as Plus } from "@src/assets/icons/plus.svg";
import { ReactComponent as NoResult } from "@src/assets/icons/noResult.svg";
import Card from "@components/Card";
import { useStores } from "@stores";
import { Link } from "react-router-dom";
import { ROUTES } from "@src/constants";
import { observer } from "mobx-react-lite";
import DepositCard from "@screens/Dashboard/Investments/DepositCard";

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
  const investment = [1];
  return (
    <Root>
      {investment.length === 0 ? (
        <NotificationCard>
          <NoResult />
          <SizedBox height={8} />
          <Text type="secondary">
            You don’t have any deposits yet.
            <br />
            Press the “Invest” button below to invest.
          </Text>
        </NotificationCard>
      ) : (
        Array.from({ length: 3 }).map(() => <DepositCard />)
      )}
      <Link to={ROUTES.INVEST}>
        <Button fixed>
          <Plus />
          <SizedBox width={8} />
          Invest
        </Button>
      </Link>
    </Root>
  );
};
export default observer(LoggInInvestments);
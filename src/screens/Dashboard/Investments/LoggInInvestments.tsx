import styled from "@emotion/styled";
import React from "react";
import Text from "@src/components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { ReactComponent as Plus } from "@src/assets/icons/plus.svg";
import { ReactComponent as NoResult } from "@src/assets/icons/noResult.svg";
import Card from "@components/Card";
import { Link } from "react-router-dom";
import { ROUTES } from "@src/constants";
import { observer } from "mobx-react-lite";
import DepositCard from "@screens/Dashboard/Investments/DepositCard";
import { useDashboardVM } from "@screens/Dashboard/DashboardVm";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotificationCard = styled(Card)<{ padding?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 16px;
  padding: ${({ padding }) => padding ?? 38}px !important;
`;

const LoggInInvestments: React.FC<IProps> = () => {
  const vm = useDashboardVM();
  return (
    <Root>
      {vm.activeBoxes.length === 0 ? (
        <NotificationCard padding={28}>
          <NoResult />
          <SizedBox height={8} />
          <Text type="secondary">
            You don’t have any deposits yet.
            <br />
            Press the “Invest” button below to invest.
          </Text>
        </NotificationCard>
      ) : (
        vm.activeBoxes.map((box, key) => <DepositCard box={box} key={key} />)
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

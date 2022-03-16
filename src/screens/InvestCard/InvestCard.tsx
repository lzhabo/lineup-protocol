import styled from "@emotion/styled";
import React, { useMemo } from "react";
import Layout from "@components/Layout";
import { InvestCardVMProvider } from "@screens/InvestCard/InvestCardVm";
import Text from "@components/Text";
import GoBack from "@components/GoBack";
import { ROUTES } from "@src/constants";
import SizedBox from "@components/SizedBox";
import AmountToLock from "./AmountToLock";
import { matchPath } from "react-router-dom";
import { Column } from "@components/Flex";
import AnimatedPage from "@components/AnimatedPage";
import { useObserver } from "mobx-react-lite";
import { useStores } from "@stores";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  min-height: 100%;
  max-width: calc(1160px + 32px);
`;

const InvestCardImpl: React.FC = () => {
  const { investStore } = useStores();
  const match = matchPath(ROUTES.INVEST_CARD, window.location.pathname);
  const locks = useObserver(() => investStore.locks);
  const lock = useMemo(
    () => locks?.find((lock) => lock.id === match?.params.id),
    [locks, match?.params.id]
  );

  return (
    <Layout>
      <Root>
        <GoBack link={ROUTES.INVEST} text="Back to Invest" />
        <SizedBox height={32} />
        <Column alignItems="center" style={{ maxWidth: "calc(480px + 32px)" }}>
          <Text textAlign="center" size="title">
            Invest to {lock?.lockPeriodDays}-day locking period
          </Text>
          <SizedBox height={32} />
          <AmountToLock />
        </Column>
      </Root>
    </Layout>
  );
};

const InvestCard: React.FC = () => (
  <InvestCardVMProvider>
    <AnimatedPage>
      <InvestCardImpl />
    </AnimatedPage>
  </InvestCardVMProvider>
);
export default InvestCard;

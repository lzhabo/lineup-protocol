import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import { InvestDaysVMProvider } from "@screens/InvestDays/InvestDaysVm";
import Text from "@components/Text";
import GoBack from "@components/GoBack";
import { ROUTES } from "@src/constants";
import SizedBox from "@components/SizedBox";
import AmountToLock from "./AmountToLock";
import { matchPath } from "react-router-dom";
import { Column } from "@components/Flex";
import AnimatedPage from "@components/AnimatedPage";

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
  margin-bottom: 24px;
  margin-top: 56px;
  text-align: left;

  @media (min-width: 768px) {
  }
`;

const InvestDaysImpl: React.FC = () => {
  return (
    <Layout>
      <Observer>
        {() => {
          const match = matchPath(ROUTES.INVEST_DAYS, window.location.pathname);
          console.log(match);
          return (
            <Root>
              <GoBack link={ROUTES.INVEST} text="Back to Invest" />
              <SizedBox height={32} />
              <Column
                alignItems="center"
                style={{ maxWidth: "calc(480px + 32px)", padding: "0 16px" }}
              >
                <Text textAlign="center" size="title">
                  Invest to 100-day locking period
                </Text>
                <SizedBox height={32} />
                <AmountToLock />
              </Column>
            </Root>
          );
        }}
      </Observer>
    </Layout>
  );
};

const InvestDaysDays: React.FC = () => (
  <InvestDaysVMProvider>
    <AnimatedPage>
      <InvestDaysImpl />
    </AnimatedPage>
  </InvestDaysVMProvider>
);
export default InvestDaysDays;

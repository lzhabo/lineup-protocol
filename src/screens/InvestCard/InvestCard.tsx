import styled from "@emotion/styled";
import React from "react";
import Layout from "@components/Layout";
import {
  InvestCardVMProvider,
  useInvestCardVM,
} from "@screens/InvestCard/InvestCardVm";
import Text from "@components/Text";
import GoBack from "@components/GoBack";
import { ROUTES } from "@src/constants";
import SizedBox from "@components/SizedBox";
import AmountToLock from "./AmountToLock";
import AnimatedPage from "@components/AnimatedPage";
import { Observer } from "mobx-react-lite";

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  width: 100%;
`;

const InvestCardImpl: React.FC = () => {
  const vm = useInvestCardVM();
  return (
    <Layout>
      <Root>
        <GoBack link={ROUTES.INVEST} text="Back to Invest" />
        <SizedBox height={32} />
        <Content>
          <Observer>
            {() => (
              <Text textAlign="center" size="title">
                Invest to {vm.lock?.lockPeriodDays}-day locking period
              </Text>
            )}
          </Observer>
          <SizedBox height={32} />
          <AmountToLock />
        </Content>
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

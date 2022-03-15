import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import { InvestDaysVMProvider } from "@screens/InvestDays/InvestDaysVm";
import Text from "@components/Text";
import GoBack from "@components/GoBack";
import { ROUTES } from "@src/constants";
import SizedBox from "@components/SizedBox";
import AmountInput from "@screens/InvestDays/AmountInput";
import { Column } from "@components/Flex";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  min-height: 100%;
  max-width: calc(1160px + 32px);
  margin-bottom: 24px;
  margin-top: 56px;
  text-align: left;

  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const InvestDaysImpl: React.FC = () => {
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <GoBack link={ROUTES.INVEST} text="Back to Invest" />
            <SizedBox height={32} />
            <Text textAlign="center" size="title">
              Invest to 100-day locking period
            </Text>
            <SizedBox height={16} />
            <Column crossAxisSize="max" justifyContent="center">
              <AmountInput />
            </Column>
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const InvestDaysDays: React.FC = () => (
  <InvestDaysVMProvider>
    <InvestDaysImpl />
  </InvestDaysVMProvider>
);
export default InvestDaysDays;

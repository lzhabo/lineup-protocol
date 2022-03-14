import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import { InvestVMProvider } from "@screens/Invest/InvestVm";
import TotalValue from "./TotalValue";
import SizedBox from "@components/SizedBox";
import Deposits from "@screens/Invest/Deposits";

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
const InvestImpl: React.FC = () => {
  // const vm = useInvestVM();
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <TotalValue />
            <SizedBox height={54} />
            <Deposits />
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const Invest: React.FC = () => (
  <InvestVMProvider>
    <InvestImpl />
  </InvestVMProvider>
);
export default Invest;

import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import TotalValue from "./TotalValue";
import SizedBox from "@components/SizedBox";
import { DashboardVMProvider } from "@screens/Dashboard/DashboardVm";
import Investments from "./Investments";

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

  @media (min-width: 768px) {
    margin-top: 56px;
  }
`;
const DashboardImpl: React.FC = () => {
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <TotalValue />
            <SizedBox height={54} />
            <Investments />
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const Dashboard: React.FC = () => (
  <DashboardVMProvider>
    <DashboardImpl />
  </DashboardVMProvider>
);
export default Dashboard;

import React from "react";
import styled from "@emotion/styled";
import Header from "@components/Header";
import { Route, Routes } from "react-router-dom";
import Invest from "@screens/Invest";
import { ROUTES } from "@src/constants";
import Dashboard from "@screens/Dashboard";
import Footer from "@components/Footer";
import InvestDays from "@screens/InvestDays/InvestDays";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  align-items: center;

  & > * {
    width: 100%;
  }
`;
const Content = styled.div`
  display: flex;
  min-height: calc(100vh - 138px);
`;

const App: React.FunctionComponent<IProps> = () => {
  return (
    <Root>
      <Header />
      <Content>
        <Routes>
          <Route path={ROUTES.INVEST} element={<Invest />} />
          <Route path={ROUTES.INVEST_DAYS} element={<InvestDays />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Routes>
      </Content>
      <Footer />
    </Root>
  );
};

export default App;

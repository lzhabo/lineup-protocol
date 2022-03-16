import React from "react";
import styled from "@emotion/styled";
import Header from "@components/Header";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Invest from "@screens/Invest";
import { ROUTES } from "@src/constants";
import Dashboard from "@screens/Dashboard";
import Footer from "@components/Footer";
import InvestDays from "@screens/InvestDays/InvestDays";
import { AnimatePresence } from "framer-motion";

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
`;

const App: React.FunctionComponent<IProps> = () => {
  const location = useLocation();
  return (
    <Root>
      <Header />
      <Content>
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path={ROUTES.INVEST} element={<Invest />} />
            <Route path={ROUTES.INVEST_DAYS} element={<InvestDays />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
          </Routes>
        </AnimatePresence>
      </Content>
      <Footer />
    </Root>
  );
};

export default App;

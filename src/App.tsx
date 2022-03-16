import React from "react";
import styled from "@emotion/styled";
import Header from "@components/Header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Invest from "@screens/Invest";
import { ROUTES } from "@src/constants";
import Dashboard from "@screens/Dashboard";
import Footer from "@components/Footer";
import InvestCard from "@screens/InvestCard/InvestCard";
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
  min-height: calc(100vh - 138px);
  padding-top: 32px;
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
            <Route path={ROUTES.INVEST_CARD} element={<InvestCard />} />
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

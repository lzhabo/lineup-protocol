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
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import { Column } from "@components/Flex";
import Button from "@components/Button";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";

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
  min-height: calc(100vh - 194px);
  padding-top: 32px;
  @media (min-width: 768px) {
    min-height: calc(100vh - 210px);
  }
`;

const App: React.FunctionComponent<IProps> = () => {
  const location = useLocation();
  const { accountStore } = useStores();
  return (
    <Root>
      <Header />
      <Content>
        <AnimatePresence exitBeforeEnter>
          {!accountStore.chainIdCorrect && accountStore.address != null ? (
            <Column
              style={{ textAlign: "center" }}
              alignItems="center"
              justifyContent="center"
              mainAxisSize="stretch"
              crossAxisSize="max"
            >
              <Text size="title">
                You need to change
                <br /> network to continue
              </Text>
              <SizedBox height={48} />
              <Button
                onClick={() =>
                  accountStore
                    .switchToDefaultChain()
                    .then(() => window.location.reload())
                }
              >
                Change network
              </Button>
            </Column>
          ) : (
            <Routes key={location.pathname} location={location}>
              <Route path={ROUTES.INVEST} element={<Invest />} />
              <Route path={ROUTES.INVEST_CARD} element={<InvestCard />} />
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
            </Routes>
          )}
        </AnimatePresence>
      </Content>
      <Footer />
    </Root>
  );
};

export default observer(App);

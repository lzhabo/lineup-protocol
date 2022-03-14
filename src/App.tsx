import React from "react";
import styled from "@emotion/styled";
import Header from "@components/Header";
import { Route, Routes } from "react-router-dom";
import NFT from "@screens/NFT";
import { ROUTES } from "@src/constants";
import Invest from "@screens/Invest";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;

  & > * {
    width: 100%;
  }
`;

const App: React.FunctionComponent<IProps> = () => {
  return (
    <Root>
      <Header />
      <Routes>
        <Route path={ROUTES.INVEST} element={<Invest />} />
        <Route path={ROUTES.NFT} element={<NFT />} />
      </Routes>
    </Root>
  );
};

export default App;

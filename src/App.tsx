import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@stores/RouterStore";
import styled from "@emotion/styled";
import Header from "@components/Header";
import SwapScreen from "@screens/SwapScreen";
import TableScreen from "@screens/TableScreen";

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
        {/*раньше нужно было exact писать, теперь если нужно много совпадений, то path="home/*"*/}
        <Route path={ROUTES.ROOT} element={<SwapScreen />} />
        <Route path={ROUTES.TABLE} element={<TableScreen />} />
      </Routes>
    </Root>
  );
};

export default App;

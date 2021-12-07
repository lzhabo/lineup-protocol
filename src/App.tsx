import React from "react";
import styled from "@emotion/styled";
import Header from "@components/Header";
import SwapScreen from "@screens/SwapScreen";

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
      <SwapScreen />
      {/*<Routes>*/}
      {/*  /!*раньше нужно было exact писать, теперь если нужно много совпадений, то path="home/*"*!/*/}
      {/*  <Route path={ROUTES.ROOT} element={<SwapScreen />} />*/}
      {/*</Routes>*/}
    </Root>
  );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@stores/RouterStore";
import Home from "@screens/Home";
import styled from "@emotion/styled";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const App: React.FunctionComponent<IProps> = () => {
  return (
    <Root>
      <Routes>
        {/*раньше нужно было exact писать, теперь если нужно много совпадений, то path="home/*"*/}
        <Route path={ROUTES.ROOT} element={<Home />} />
      </Routes>
    </Root>
  );
};

export default App;

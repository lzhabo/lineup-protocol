import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as Logo } from "@src/assets/bigLogo.svg";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  height: 100vh;
  width: 100vw;
`;

const App: React.FC<IProps> = () => {
  return (
    <Root>
      <Logo />
    </Root>
  );
};
export default App;

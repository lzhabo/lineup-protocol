import styled from "@emotion/styled";
import React from "react";
import Header from "@components/Header";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home: React.FC<IProps> = () => {
  return (
    <Root>
      <Header />
    </Root>
  );
};
export default Home;

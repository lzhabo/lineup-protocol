import styled from "@emotion/styled";
import React from "react";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Loading: React.FC<IProps> = () => {
  return <Root>Loading</Root>;
};
export default Loading;

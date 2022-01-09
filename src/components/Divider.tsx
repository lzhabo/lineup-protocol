import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .divider {
    position: absolute;
    width: 100vw;
    height: 1px;
    background: #1f1e25;
  }
`;

const Divider: React.FC<IProps> = ({ ...rest }) => {
  return (
    <Root {...rest}>
      <div className="divider" />
    </Root>
  );
};
export default Divider;

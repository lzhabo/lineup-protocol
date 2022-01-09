import styled from "@emotion/styled";
import React from "react";
import { Row } from "@components/Flex";

interface IProps {}

const Root = styled(Row)`
  background: #1f1e25;
  border-radius: 20px;
  padding: 2px;
  height: 40px;
  width: fit-content;
  box-sizing: border-box;
`;

const Item = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 16px;
  flex: 1;
  background: ${({ active }) => (active ? "#535362" : "transparent")};
  border-radius: 20px;
  width: fit-content;
  height: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
`;

const SwitchButton: React.FC<IProps> = () => {
  return (
    <Root>
      <Item active>APY</Item>
      <Item>TVL</Item>
    </Root>
  );
};
export default SwitchButton;

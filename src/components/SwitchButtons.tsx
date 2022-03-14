import styled from "@emotion/styled";
import React from "react";
import { Row } from "@components/Flex";

interface IProps {
  values: [string, string];
  active: 0 | 1;
  onActivate: (v: 0 | 1) => void;
  border?: boolean;
}

const Root = styled(Row)<{ border?: boolean }>`
  display: flex;
  background: #1f1e25;
  border-radius: 20px;
  width: fit-content;
  padding: 4px;
`;

const Item = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ active }) => (active ? "#666de3" : "transparent")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#79787D")};
  border-radius: 16px;
  padding: 0 30px;
  height: 32px;
  width: 134px;
  box-sizing: border-box;
  cursor: ${({ active }) => (active ? "default" : " pointer")};

  img {
    margin-right: 8px;
  }
`;

const SwitchButtons: React.FC<IProps> = ({
  values,
  active,
  onActivate,
  border,
}) => {
  return (
    <Root border={border}>
      <Item
        active={active === 0}
        onClick={() => onActivate(0)}
        // style={{ marginRight: 16 }}
      >
        {values[0]}
      </Item>
      <Item active={active === 1} onClick={() => onActivate(1)}>
        {values[1]}
      </Item>
    </Root>
  );
};
export default SwitchButtons;

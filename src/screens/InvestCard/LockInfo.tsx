import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";

interface IProps {
  name: string;
  value: string;
  borderless?: boolean;
}

const Root = styled.div`
  display: flex;
  border-bottom: 1px solid #3b3b46;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
`;

const LockInfo: React.FC<IProps> = ({ name, value, borderless }) => {
  return (
    <Root style={borderless ? { border: "none" } : {}}>
      <Text fitContent type="secondary">
        {name}
      </Text>
      <Text fitContent textAlign="right">
        {value}
      </Text>
    </Root>
  );
};
export default LockInfo;

import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";

interface IProps {
  name: string;
  value: string;
}

const Root = styled.div`
  display: flex;
  border-bottom: 1px solid #3b3b46;
  width: 100%;
  padding: 10px 0;
`;

const LockInfo: React.FC<IProps> = ({ name, value }) => {
  return (
    <Root>
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

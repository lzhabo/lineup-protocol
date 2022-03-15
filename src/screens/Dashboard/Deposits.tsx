import styled from "@emotion/styled";
import React from "react";
import Text from "@src/components/Text";
import SizedBox from "@components/SizedBox";
import DepositCard from "./DepositCard";
import Button from "@components/Button";
import { ReactComponent as Plus } from "@src/assets/icons/plus.svg";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Deposits: React.FC<IProps> = () => {
  return (
    <Root>
      <Text weight={600} size="big">
        My Deposits
      </Text>
      <SizedBox height={24} />
      {Array.from({ length: 2 }).map(() => (
        <DepositCard />
      ))}
      <Button fixed kind="secondary">
        <Plus />
        <SizedBox width={8} />
        Invest more
      </Button>
    </Root>
  );
};
export default Deposits;

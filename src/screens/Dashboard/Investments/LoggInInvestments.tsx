import styled from "@emotion/styled";
import Button from "@src/components/Button";
import SizedBox from "@src/components/SizedBox";
import React from "react";
import DepositCard from "./DepositCard";
import { ReactComponent as Plus } from "@src/assets/icons/plus.svg";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoggInInvestments: React.FC<IProps> = () => {
  return (
    <Root>
      {Array.from({ length: 2 }).map((_, i) => (
        <DepositCard key={i} />
      ))}
      <Button fixed>
        <Plus />
        <SizedBox width={8} />
        Invest more
      </Button>
    </Root>
  );
};
export default LoggInInvestments;

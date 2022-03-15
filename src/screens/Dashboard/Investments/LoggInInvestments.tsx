import styled from "@emotion/styled";
import Button from "@src/components/Button";
import SizedBox from "@src/components/SizedBox";
import React from "react";
import DepositCard from "./DepositCard";
import { ReactComponent as Plus } from "@src/assets/icons/plus.svg";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@src/constants";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoggInInvestments: React.FC<IProps> = () => {
  const navigate = useNavigate();
  return (
    <Root>
      {Array.from({ length: 2 }).map((_, i) => (
        <DepositCard key={i} />
      ))}
      <Button fixed onClick={() => navigate(ROUTES.INVEST)}>
        <Plus />
        <SizedBox width={8} />
        Invest more
      </Button>
    </Root>
  );
};
export default observer(LoggInInvestments);

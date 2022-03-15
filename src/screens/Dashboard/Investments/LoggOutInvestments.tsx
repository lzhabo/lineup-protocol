import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import { ReactComponent as Wallet } from "@src/assets/images/wallet.svg";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@src/constants";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoggOutInvestments: React.FC<IProps> = () => {
  const navigate = useNavigate();
  return (
    <Root>
      <Card justifyContent="center" alignItems="center">
        <Wallet style={{ height: 56, width: 56 }} />
        <SizedBox height={8} />
        <Text fitContent>Connect your wallet to see deposits</Text>
      </Card>
      <SizedBox height={16} />
      <Button fixed onClick={() => navigate(ROUTES.INVEST)}>
        Invest
      </Button>
    </Root>
  );
};
export default LoggOutInvestments;

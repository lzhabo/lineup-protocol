import styled from "@emotion/styled";
import React from "react";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";

interface IProps {
  periodDays: number;
  apy: number;
  description: string;
  pic: string;
  onClick: () => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: center;
`;

const Top = styled.div`
  display: flex;
  background: #2a2a32;
  border-radius: 16px 16px 0 0;
  padding: 28px 16px;
  justify-content: space-between;
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  background: #1f1e25;
  padding: 16px;
  border-radius: 0 0 16px 16px;
`;
const Img = styled.img`
  height: 56px;
  width: 56px;
`;
const InvestCard: React.FC<IProps> = ({
  periodDays,
  description,
  apy,
  pic,
  onClick,
}) => {
  return (
    <Root>
      <Top>
        <Column>
          <Text>{periodDays.toFixed(0)} min locking period</Text>
          <Text size="big">{apy}% APY</Text>
        </Column>
        <Img src={pic} />
      </Top>
      <SizedBox height={2} />
      <Bottom>
        <Text type="secondary">{description}</Text>
        <SizedBox height={24} />
        <Button onClick={onClick} fixed>
          Invest
        </Button>
      </Bottom>
    </Root>
  );
};
export default InvestCard;

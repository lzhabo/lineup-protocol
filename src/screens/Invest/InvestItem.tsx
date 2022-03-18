import styled from "@emotion/styled";
import React from "react";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { Lock } from "@stores/InvestStore";
import LockInfo from "@screens/InvestCard/LockInfo";
import dayjs from "dayjs";

interface IProps {
  lock: Lock;
  description: string;
  pic: string;
  onClick: () => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  background: #2a2a32;
  border-radius: 16px 16px 0 0;
  padding: 28px 16px;
  justify-content: space-between;
  @media (min-width: 768px) {
    padding: 28px 32px;
  }
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  background: #1f1e25;
  padding: 16px;
  border-radius: 0 0 16px 16px;
  @media (min-width: 768px) {
    padding: 16px 32px;
  }
`;
const Img = styled.img`
  height: 56px;
  width: 56px;
`;
const InvestItem: React.FC<IProps> = ({ description, lock, pic, onClick }) => {
  const unlock = dayjs()
    .add(lock?.lockPeriod, "seconds")
    .format("DD/MM/YY, hh:mm");
  return (
    <Root>
      <Top>
        <Column>
          <Text>{lock.lockPeriodDays}-day locking period</Text>
          <Text size="big">{lock.basePercent}% APY</Text>
        </Column>
        <Img src={pic} />
      </Top>
      <SizedBox height={2} />
      <Bottom>
        <Column crossAxisSize="max">
          <LockInfo name="Network" value="BNB Smart Chain" />
          <LockInfo name="Asset" value="USDT" />
          <LockInfo name="Unlock" value={unlock} borderless />
        </Column>
        <SizedBox height={24} />
        <Button size="medium" onClick={onClick} fixed>
          Invest
        </Button>
      </Bottom>
    </Root>
  );
};
export default InvestItem;

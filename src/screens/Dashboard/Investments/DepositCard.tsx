import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@components/Flex";
import Divider from "@components/Divider";
import Card from "@components/Card";
import styled from "@emotion/styled";

interface IProps {}

const Status = styled.div<{ locked?: boolean }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  padding: 4px 12px;
  color: ${({ locked }) => (locked ? "#ffffff" : "#7ce34f")};
  background: ${({ locked }) => (locked ? "#3B3B46" : "#2a352a")};
  border-radius: 14px;
`;
const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  @media (min-width: 768px) {
    display: flex;
  }
`;
const DepositCard: React.FC<IProps> = () => {
  const data = [
    { name: "Locked", value: "$99,999.99" },
    { name: "APY", value: "14.88%" },
    { name: "Profit", value: "$999.99" },
    { name: "Unlock", value: "21/04/22, 13:37" },
  ];
  const actions = [
    { title: "Deposit again", onClick: () => null },
    { title: "Withdraw", onClick: () => null },
    { title: "Emergency unlock", onClick: () => null },
  ];
  return (
    <Card style={{ marginBottom: 16 }}>
      <Row alignItems="center">
        <Text fitContent>7-day Deposit</Text>
        <SizedBox width={16} />
        <Status locked>Unlocked</Status>
      </Row>
      <SizedBox height={24} />
      <Info>
        {data.map(({ name, value }) => (
          <Column crossAxisSize="max" key={value}>
            <Text type="secondary" size="medium">
              {name}
            </Text>
            <Text>{value}</Text>
          </Column>
        ))}
      </Info>
      <SizedBox height={24} />
      <Divider />
      <SizedBox height={24} />
      <Row>
        {actions.map(({ title, onClick }, i) => (
          <Text
            fitContent
            type="purple"
            onClick={onClick}
            style={{ marginRight: 24 }}
            key={i}
          >
            {title}
          </Text>
        ))}
      </Row>
    </Card>
  );
};
export default DepositCard;

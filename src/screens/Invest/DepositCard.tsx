import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@components/Flex";
import Divider from "@components/Divider";
import Card from "@components/Card";

interface IProps {}

const DepositCard: React.FC<IProps> = () => {
  const data = [
    { name: "Locked", value: "$99,999.99" },
    { name: "APY", value: "14.88%" },
    { name: "Profit", value: "$999.99" },
    { name: "Unlock", value: "21/04/22, 13:37" },
  ];
  return (
    <Card style={{ marginBottom: 16 }}>
      <Text>7-day Deposit</Text>
      <SizedBox height={24} />
      <Row justifyContent="space-between">
        {data.map(({ name, value }) => (
          <Column crossAxisSize="max">
            <Text type="secondary" size="medium">
              {name}
            </Text>
            <Text>{value}</Text>
          </Column>
        ))}
      </Row>
      <SizedBox height={24} />
      <Divider />
      <SizedBox height={24} />
      <Row>
        <Text fitContent type="purple">
          Deposit again
        </Text>
        <SizedBox width={24} />
        <Text fitContent type="purple">
          Withdraw
        </Text>
      </Row>
    </Card>
  );
};
export default DepositCard;

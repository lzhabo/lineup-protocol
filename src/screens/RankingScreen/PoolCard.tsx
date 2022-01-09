import styled from "@emotion/styled";
import { Column, Row } from "@src/components/Flex";
import React, { useState } from "react";
import Text from "@components/Text";
import StarCheckbox from "@screens/RankingScreen/StarCheckbox";
import SizedBox from "@components/SizedBox";

interface IProps {
  data: {
    dex: string;
    apy: string;
    tvl: string;
    tokens: Array<{ symbol: string; icon: string }>;
  };
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  min-width: 280px;
  height: 152px;
  background: #1f1e25;
  border-radius: 8px;
`;

const Coins = styled.div`
  img {
    border-radius: 50%;
    margin-left: -8px;
    border: 1px solid #1f1e25;
  }
`;

const PoolCard: React.FC<IProps> = ({ data }) => {
  const [starChecked, setStarChecked] = useState(false);
  return (
    <Root>
      <Row
        style={{ padding: "16px 24px", boxSizing: "border-box" }}
        justifyContent="space-between"
      >
        <Column>
          <Text>{data.tokens.map(({ symbol }) => symbol).join(" + ")}</Text>
          <Text size="small" style={{ color: "#666DE3" }}>
            {data.dex}
          </Text>
        </Column>
        <Row alignItems="center" mainAxisSize="fit-content">
          <Coins>
            {data.tokens.map(({ icon, symbol }) => (
              <img src={icon} alt={symbol} />
            ))}
          </Coins>
          <SizedBox width={16} />
          <StarCheckbox checked={starChecked} onChange={setStarChecked} />
        </Row>
      </Row>
      <Row
        style={{
          padding: "16px 24px",
          boxSizing: "border-box",
          borderTop: "1px solid #0B0B0D",
        }}
      >
        <Column style={{ flex: 1 }}>
          <Text size="small" style={{ color: "#747489" }}>
            APY
          </Text>
          <Text>{data.apy}</Text>
        </Column>
        <Column style={{ flex: 1 }}>
          <Text size="small" style={{ color: "#747489" }}>
            TVL
          </Text>
          <Text>{data.tvl}</Text>
        </Column>
      </Row>
    </Root>
  );
};
export default PoolCard;

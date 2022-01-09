import styled from "@emotion/styled";
import React, { useState } from "react";
import { Row } from "@components/Flex";
import PinCheckbox from "@components/PinCheckbox";
import PoolCard from "@screens/RankingScreen/PoolCard";
import bnbIcon from "@src/assets/tokens/bnb.svg";
import ethIcon from "@src/assets/tokens/eth.svg";
import usdtIcon from "@src/assets/tokens/usdt.svg";
import btcIcon from "@src/assets/tokens/btc.svg";
import busdIcon from "@src/assets/tokens/busd.svg";
import cakeIcon from "@src/assets/tokens/cake.svg";
import usdcIcon from "@src/assets/tokens/usdc.svg";
import daiIcon from "@src/assets/tokens/dai.svg";
import unknownIcon from "@src/assets/tokens/unknown.svg";

interface IProps {}

const Root = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & .column {
    margin-right: 40px;
    &:last-of-type {
      margin-right: 0;
    }
    width: 100%;
    & > * {
      margin-bottom: 16px;
    }
  }
`;

const Title = styled(Row)`
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 26px;
  line-height: 34px;
  color: #ffffff;
`;

const PoolsGrid: React.FC<IProps> = () => {
  const [pins, setPins] = useState([false, false, false]);
  const setPin = (index: 0 | 1 | 2, state: boolean) => {
    const newValue = [...pins];
    newValue[index] = state;
    setPins(newValue);
  };
  return (
    <Root>
      <div className="column">
        <Title>
          Ethereum{" "}
          <PinCheckbox checked={pins[0]} onChange={(v) => setPin(0, v)} />
        </Title>
        {data.eth.map((data, i) => (
          <PoolCard key={"eth" + i} {...{ data }} />
        ))}
      </div>
      <div className="column">
        <Title>
          Binance SC{" "}
          <PinCheckbox checked={pins[1]} onChange={(v) => setPin(1, v)} />
        </Title>
        {data.bsc.map((data, i) => (
          <PoolCard key={"bsc" + i} {...{ data }} />
        ))}
      </div>
      <div className="column">
        <Title>
          Polygon{" "}
          <PinCheckbox checked={pins[2]} onChange={(v) => setPin(2, v)} />
        </Title>
        {data.polygon.map((data, i) => (
          <PoolCard key={"polygon" + i} {...{ data }} />
        ))}
      </div>
    </Root>
  );
};
export default PoolsGrid;
const data = {
  eth: [
    {
      dex: "Sushi",
      apy: "15.6%",
      tvl: "$104.2M",
      tokens: [
        { symbol: "ETH", icon: ethIcon },
        { symbol: "USDT", icon: usdtIcon },
      ],
    },
    {
      dex: "Curve",
      apy: "15.6%",
      tvl: "$104.2M",
      tokens: [
        { symbol: "ETH", icon: ethIcon },
        { symbol: "USDT", icon: usdtIcon },
        { symbol: "WBTC", icon: btcIcon },
      ],
    },
    {
      dex: "Curve",
      apy: "15.6%",
      tvl: "$104.2M",
      tokens: [
        { symbol: "ETH", icon: ethIcon },
        { symbol: "USDT", icon: usdtIcon },
      ],
    },
  ],
  bsc: [
    {
      dex: "Pancake",
      apy: "15.6%",
      tvl: "$104.2M",
      tokens: [
        { symbol: "BNB", icon: bnbIcon },
        { symbol: "BUSD", icon: busdIcon },
      ],
    },
    {
      dex: "Pancake",
      apy: "15.6%",
      tvl: "$104.2M",
      tokens: [
        { symbol: "BUSD", icon: busdIcon },
        { symbol: "CAKE", icon: cakeIcon },
      ],
    },
    {
      dex: "Ellipsis",
      apy: "15.6%",
      tvl: "$104.2M",
      tokens: [
        { symbol: "BUSD", icon: busdIcon },
        { symbol: "USDC", icon: usdcIcon },
        { symbol: "DAI", icon: daiIcon },
      ],
    },
  ],
  polygon: [
    {
      dex: "DeFi Title",
      apy: "N%",
      tvl: "$N",
      tokens: [
        { symbol: "ASSET", icon: unknownIcon },
        { symbol: "ASSET", icon: unknownIcon },
      ],
    },

    {
      dex: "DeFi Title",
      apy: "N%",
      tvl: "$N",
      tokens: [
        { symbol: "ASSET", icon: unknownIcon },
        { symbol: "ASSET", icon: unknownIcon },
      ],
    },

    {
      dex: "DeFi Title",
      apy: "N%",
      tvl: "$N",
      tokens: [
        { symbol: "ASSET", icon: unknownIcon },
        { symbol: "ASSET", icon: unknownIcon },
      ],
    },
    {
      dex: "DeFi Title",
      apy: "N%",
      tvl: "$N",
      tokens: [
        { symbol: "ASSET", icon: unknownIcon },
        { symbol: "ASSET", icon: unknownIcon },
      ],
    },
  ],
};

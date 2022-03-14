import styled from "@emotion/styled";
import React, { useState } from "react";
import tradeIcon from "@src/assets/icons/trade.svg";
import investIcon from "@src/assets/icons/invest.svg";

interface IProps {}

const Root = styled.div`
  display: flex;
  background: #1f1e25;
  border-radius: 20px;
  width: fit-content;
  padding: 4px;
`;
const Item = styled.div<{ active: boolean; selectable?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ active }) => (active ? "#666de3" : "transparent")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#79787D")};
  border-radius: 16px;
  padding: 0 30px;
  height: 32px;
  width: 134px;
  box-sizing: border-box;
  cursor: ${({ active }) => (active ? " pointer" : "not-allowed")};

  img {
    margin-right: 8px;
  }
`;

const tabs = [
  { title: "Overview", route: "overview", selectable: true },
  { title: "Invest", route: "invests", selectable: false },
  {
    title: "Liquidity Pools",
    route: "pools",
    icon: investIcon,
    selectable: false,
  },
];
const Tabs: React.FC<IProps> = () => {
  const [tab, setTab] = useState(0);
  return (
    <Root>
      {tabs.map(({ title, route, icon, selectable }, index) => (
        <Item
          active={tab === index}
          key={route}
          onClick={() => selectable && setTab(index)}
          selectable={selectable}
        >
          {title}
        </Item>
      ))}
    </Root>
  );
};
export default Tabs;

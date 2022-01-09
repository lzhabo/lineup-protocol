import styled from "@emotion/styled";
import React, { useState } from "react";
import tradeIcon from "@src/assets/icons/trade.svg";
import investIcon from "@src/assets/icons/invest.svg";
import { Link } from "react-router-dom";

interface IProps {}

const Root = styled.div`
  display: flex;
  border-radius: 20px;
  padding: 4px;
  width: 100%;
`;
const Item = styled.div<{ active: boolean; selectable?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active }) => (active ? "#FFFFFF" : "#A2A2C0")};
  padding: 0 16px;
  box-sizing: border-box;
  cursor: ${({ active }) => (active ? " pointer" : "not-allowed")};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
`;

const tabs = [
  { title: "Ranking", route: "/", icon: tradeIcon, selectable: true },
  {
    title: "Cross-chain swap",
    route: "/test",
    icon: investIcon,
    selectable: false,
  },
  {
    title: "Portfolio calculator",
    route: "/test",
    icon: investIcon,
    selectable: false,
  },
  {
    title: "Watchlist",
    route: "/test",
    icon: investIcon,
    selectable: false,
  },
];
const Tabs: React.FC<IProps> = () => {
  const [tab, setTab] = useState(0);
  return (
    <Root>
      {tabs.map(({ title, route, icon, selectable }, index) => (
        <Link to={route} key={route} style={{ textDecoration: "none" }}>
          <Item
            active={tab === index}
            onClick={() => selectable && setTab(index)}
            selectable={selectable}
          >
            {title}
          </Item>
        </Link>
      ))}
    </Root>
  );
};
export default Tabs;

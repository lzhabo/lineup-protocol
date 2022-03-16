import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import { Row } from "@components/Flex";
import { ReactComponent as Telegram } from "@src/assets/icons/telegram.svg";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  min-height: 100%;
  width: calc(100% - 32px);
  max-width: calc(1160px + 32px);
  margin: 0 16px;
  text-align: left;

  border-top: 2px #2a2a32 solid;
  padding: 16px;
  //path {
  //  transition: 0.4s;
  //  fill: #ffffff;
  //}
  //:hover {
  //  path {
  //    fill: #a2a2c0;
  //  }
  //}
`;
const Footer: React.FC<IProps> = () => {
  return (
    <Root>
      <Text type="secondary" fitContent>
        LineUp Protocol, Escape, 2022
      </Text>
      <Row mainAxisSize="fit-content">
        {/*<Desktop type="secondary">Join us on social media</Desktop>*/}
        {/*<Twitter*/}
        {/*  style={{ minWidth: 21, cursor: "pointer" }}*/}
        {/*  onClick={() => window.open("https://t.me/nftescape", "_blank")}*/}
        {/*/>*/}
        <SizedBox width={20} />
        <Telegram
          style={{ minWidth: 21, cursor: "pointer" }}
          onClick={() => window.open("https://t.me/nftescape", "_blank")}
        />
      </Row>
    </Root>
  );
};
export default Footer;

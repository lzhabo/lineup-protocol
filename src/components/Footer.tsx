import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import { Row } from "@components/Flex";
import { ReactComponent as Twitter } from "@src/assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "@src/assets/icons/telegram.svg";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  max-width: calc(1160px + 32px);
  margin-bottom: 24px;
  margin-top: 56px;
  text-align: left;

  @media (min-width: 880px) {
    margin-top: 56px;
  }
  border-top: 2px #2a2a32 solid;
  padding: 16px;
`;

const Footer: React.FC<IProps> = () => {
  return (
    <Root>
      <Text type="secondary" fitContent>
        LineUp Protocol, 2022
      </Text>
      <Row mainAxisSize="fit-content">
        <Twitter />
        <SizedBox width={20} />
        <Telegram />
      </Row>
    </Root>
  );
};
export default Footer;

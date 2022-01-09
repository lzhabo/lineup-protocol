import styled from "@emotion/styled";
import React, { useState } from "react";
import { Row } from "@components/Flex";
import Select from "@components/Select";
import SwitchBox from "@components/SwitchBox";
import SizedBox from "@components/SizedBox";
import Divider from "@components/Divider";
import SwitchButton from "@components/SwitchButton";
import PoolsGrid from "@screens/RankingScreen/PoolsGrid";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 54px;
  box-sizing: border-box;
  padding: 0 16px;
  max-width: calc(1280px + 16px + 16px);
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 40px;
  line-height: 56px;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin-bottom: 16px;
  white-space: nowrap;
`;
const SwitchWrapper = styled(Row)`
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  width: fit-content;
  white-space: nowrap;
`;

const RankingScreen: React.FC<IProps> = () => {
  const [swapModeChecked, setSwapModeChecked] = useState(false);

  return (
    <Root>
      <Title>Farming ranking</Title>
      <Row alignItems="center" justifyContent="space-between">
        <Select style={{ minWidth: 320 }}>Select your assets for filter</Select>
        <SwitchWrapper>
          Swap mode
          <SizedBox width={8} />
          <SwitchBox checked={swapModeChecked} onChange={setSwapModeChecked} />
        </SwitchWrapper>
      </Row>
      <Divider style={{ marginTop: 32 }} />
      <Row style={{ padding: "16px 0" }}>
        <Select>All chains</Select>
        <SizedBox width={8} />
        <Select>All assets</Select>
        <SizedBox width={8} />
        <SwitchButton />
      </Row>
      <Divider style={{ marginBottom: 32 }} />
      <PoolsGrid />
    </Root>
  );
};
export default RankingScreen;

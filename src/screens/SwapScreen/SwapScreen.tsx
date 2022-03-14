import styled from "@emotion/styled";
import React from "react";
import TokenInput from "@components/TokenInput";
import SwapFromTo from "@components/SwapFromTo";
import Button from "@components/Button";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 96px;
  max-width: 560px;
  background: #1f1e25;
  border-radius: 8px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;
const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #79787d;

  .balance-selector {
    display: flex;

    & > * {
      padding-right: 8px;
    }
  }
`;

const percents = ["25%", "50%", "75%", "100%"];
const SwapScreen: React.FC<IProps> = () => {
  return (
    <Root>
      <Wrapper>
        <TokenInput />
        <Balance>
          <div className="balance-selector">
            <div>Balance: 1,230.49502</div>
            {percents.map((p) => (
              <div key={p} style={{ color: "#666DE3" }}>
                {p}
              </div>
            ))}
          </div>
          <div>~ $69,682.0</div>
        </Balance>
        <SwapFromTo
          fromValue="1"
          toValue="12.3943"
          toSymbol="ETH"
          fromSymbol="BTC"
        />
        <TokenInput divided />
        <Balance>
          <div>Balance: 0.24051</div>
          <div>~ $69,694.0</div>
        </Balance>
      </Wrapper>
      <Button>Swap</Button>
    </Root>
  );
};
export default SwapScreen;

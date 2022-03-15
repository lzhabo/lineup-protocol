import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import BN from "@src/utils/BN";
import BigNumberInput from "@components/BigNumberInput";
import _ from "lodash";
import AmountInput from "./TokenInput/AmountInput";
import Card from "@components/Card";
import SizedBox from "@components/SizedBox";
import Divider from "@components/Divider";
import { Row } from "@components/Flex";
import Text from "@components/Text";

interface IProps {
  decimals: number;
  amount: BN;
  setAmount?: (amount: BN) => void;
  balance: BN;
  symbol: string;
}

const Root = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div<{
  focused?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 28px;
  width: 100%;
  position: relative;
  color: #747489;
  cursor: ${({ readOnly }) => (readOnly ? "not-allowed" : "unset")};

  box-sizing: border-box;

  input {
    cursor: ${({ readOnly }) => (readOnly ? "not-allowed" : "unset")};
  }
`;
const TokenInput: React.FC<IProps> = (props) => {
  const [focused, setFocused] = useState(false);
  const [amount, setAmount] = useState<BN>(props.amount);

  useEffect(() => {
    props.amount && setAmount(props.amount);
  }, [props.amount]);

  const handleChangeAmount = (v: BN) => {
    setAmount(v);
    debounce(v);
  };
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const debounce = useCallback(
    _.debounce((value: BN) => {
      props.setAmount && props.setAmount(value);
    }, 500),
    []
  );
  const error = amount.gt(props.balance);
  const balance = BN.formatUnits(props.balance, props.decimals);
  return (
    <Root>
      <InputContainer focused={focused} readOnly={!props.setAmount}>
        <BigNumberInput
          renderInput={(props, ref) => (
            <AmountInput
              {...props}
              onFocus={(e) => {
                props.onFocus && props.onFocus(e);
                !props.readOnly && setFocused(true);
              }}
              onBlur={(e) => {
                props.onBlur && props.onBlur(e);
                setFocused(false);
              }}
              ref={ref}
            />
          )}
          autofocus={focused}
          decimals={props.decimals}
          value={amount}
          onChange={handleChangeAmount}
          placeholder={"0.00 " + props.symbol}
        />
      </InputContainer>
      <SizedBox height={8} />
      <Divider
        style={
          error
            ? { background: "#E34744", height: 1 }
            : { background: "#3B3B46", height: 1 }
        }
      />
      <SizedBox height={8} />
      <Row justifyContent="space-between">
        <Text type={error ? "error" : "secondary"} fitContent>
          Balance: {balance.toFormat(2)}
        </Text>
        <Row mainAxisSize="fit-content">
          {[25, 50, 75, 100].map((v, i, arr) => (
            <Text
              fitContent
              type="purple"
              key={v}
              style={{
                marginRight: arr.length - 1 === i ? 0 : 8,
                cursor: "pointer",
              }}
              onClick={() => {
                handleChangeAmount(props.balance.times(v).times(0.01));
              }}
            >
              {v}%
            </Text>
          ))}
        </Row>
      </Row>
    </Root>
  );
};
export default observer(TokenInput);

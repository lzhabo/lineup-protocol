import React from "react";
import styled from "@emotion/styled";

const Root = styled.input`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  color: #ffffff;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type="number"] {
    -moz-appearance: textfield;
  }

  ::placeholder {
    color: #747489;
  }
`;

type TProps = React.InputHTMLAttributes<HTMLInputElement>;

const AmountInput = React.forwardRef<HTMLInputElement, TProps>(
  ({ onWheel, ...props }, ref) => (
    <Root
      {...props}
      ref={ref}
      type="number"
      onWheel={(e) => {
        e.target && (e.target as any).blur();
        onWheel && onWheel(e);
      }}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
    />
  )
);

AmountInput.displayName = "AmountInput";

export default AmountInput;

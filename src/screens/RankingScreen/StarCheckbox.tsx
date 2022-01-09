import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked?: boolean;
  onChange?: (state: boolean) => void;
}

const Root = styled.div`
  cursor: pointer;
`;

const StarCheckbox: React.FC<IProps> = ({ checked, onChange, ...rest }) => (
  <Root onClick={() => onChange && onChange(!checked)} {...rest}>
    {checked ? (
      <svg
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 1L12.3276 6.79629L18.5595 7.21885L13.7662 11.2237L15.2901 17.2812L10 13.96L4.70993 17.2812L6.23382 11.2237L1.44049 7.21885L7.67237 6.79629L10 1Z"
          fill="#666DE3"
          stroke="#666DE3"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 1L12.3276 6.79629L18.5595 7.21885L13.7662 11.2237L15.2901 17.2812L10 13.96L4.70993 17.2812L6.23382 11.2237L1.44049 7.21885L7.67237 6.79629L10 1Z"
          stroke="#747489"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </Root>
);

export default StarCheckbox;

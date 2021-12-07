import React from "react";
import styled from "@emotion/styled";
import { Column } from "@components/Flex";

export declare namespace ToggleButton {
  export type Props = {
    opened?: boolean;
    disabled?: boolean;
    level?: number;
  };
}

const Root = styled(Column)<{
  opened?: boolean;
  level?: number;
  disabled?: boolean;
}>`
  min-height: 30px;
  width: 10px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background: ${({ level }) =>
    level && level % 2 === 0 ? "#EBF0F6" : "#cfdae3"};
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: -1px;
  top: -1px;
  z-index: 100;

  svg {
    transition: 0.3s;
    transform: rotate(${({ opened }) => (opened ? 0 : -90)}deg);
  }
`;

export function ToggleButton({
  disabled,
  level,
  ...rest
}: ToggleButton.Props & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Root
      {...rest}
      level={level}
      disabled={disabled}
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        !disabled && rest.onClick && rest.onClick(e)
      }
    >
      {!disabled && <Arrow />}
    </Root>
  );
}

const Arrow: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    {...props}
    width="10"
    height="16"
    viewBox="0 0 10 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 7L5 9L3 7"
      stroke="#95A7B8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

import React, { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

const SizedBox: React.FunctionComponent<IProps> = ({
  width,
  height,
  ...rest
}) => (
  <div
    style={{ width, height, display: "flex", flex: "0 0 auto", ...rest.style }}
    {...rest}
  />
);

export default SizedBox;

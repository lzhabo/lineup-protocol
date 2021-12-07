import styled from "@emotion/styled";
import React from "react";

const Button = styled.button<{ borderRadius?: string; clickable?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: ${({ clickable }) => (clickable ? "not-allowed" : "pointer")};

  width: 100%;
  position: static;
  left: 0px;
  top: 273px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  background: #666de3;
  padding: 16px 0;
  border-style: none;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : "none"};
`;

export default Button;

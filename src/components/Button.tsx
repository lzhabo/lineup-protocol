import styled from "@emotion/styled";

type TButtonType = "primary" | "secondary";
type TButtonSize = "medium" | "large";
type TButtonRound = "default" | "round";

const Button = styled.button<{
  kind?: TButtonType;
  size?: TButtonSize;
  round?: TButtonRound;
  fixed?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: ${({ kind }) => (kind === "secondary" ? "#1F1E25" : "#666DE3")};
  box-shadow: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  outline: none;
  border: none;
  transition: 0.4s;
  width: ${({ fixed }) => (fixed ? "100%" : "fit-content")};

  padding: 0 24px;
  border-radius: ${({ size }) => (size === "medium" ? 20 : 26)}px;
  height: ${({ size }) => (size === "medium" ? 40 : 52)}px;

  :hover {
    background: ${({ kind }) => (kind === "secondary" ? "#535362" : "#767EFF")};
    cursor: pointer;
  }

  :disabled {
    background: rgba(102, 109, 227, 0.4);
    color: #e3e3ff;
    cursor: not-allowed;
    //opacity: 0.4;
  }

  @media (min-width: 768px) {
    border-radius: ${({ size }) => (size === "medium" ? 20 : 16)}px;
  }
`;

export default Button;

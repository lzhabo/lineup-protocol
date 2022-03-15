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
  border-radius: 20px;
  box-shadow: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  outline: none;
  border: none;

  width: ${({ fixed }) => (fixed ? "100%" : "fit-content")};

  padding: 0 24px;
  height: 40px;

  :hover {
    cursor: pointer;
  }

  :disabled {
    opacity: ${({ kind }) => (kind === "secondary" ? 0.4 : 1)};
    background: ${({ kind }) => (kind === "secondary" ? "#fff" : "#c6c9f4")};
    border: 1px solid
      ${({ kind }) => (kind === "secondary" ? "#F1F2FE" : "#c6c9f4")};
    cursor: not-allowed;
  }
`;

export default Button;

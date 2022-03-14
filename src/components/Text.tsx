import styled from "@emotion/styled";

type TTextType = "primary" | "secondary" | "light" | "purple" | "error";
type TTextSize = "small" | "medium" | "large" | "big";
type TTextAlign = "center" | "left" | "right" | "justify";

const Text = styled.div<{
  type?: TTextType;
  weight?: 400 | 500 | 600;
  size?: TTextSize;
  fitContent?: boolean;
  nowrap?: boolean;
  textAlign?: TTextAlign;
}>`
  width: ${({ fitContent }) => (fitContent ? "fit-content" : "100%")};
  font-weight: ${({ weight }) => weight ?? 500};
  white-space: ${({ nowrap }) => (nowrap ? "nowrap" : "unset")};
  text-align: ${({ textAlign }) => textAlign ?? "default"};

  ${({ size }) =>
    (() => {
      switch (size) {
        case "medium":
          return "font-size: 14px; line-height: 20px;";
        case "big":
          return "font-size: 26px; line-height: 34px;";
        case "large":
          return "font-size: 32px;line-height: 40px;";
        default:
          return "font-size: 16px; line-height: 24px;";
      }
    })()}
  ${({ type }) =>
    (() => {
      switch (type) {
        case "secondary":
          return "color: #A2A2C0;";
        case "primary":
          return "color: #ffffff";
        case "purple":
          return "color: #767EFF;";
        default:
          return "color: #ffffff";
      }
    })()}
`;

export default Text;

import styled from "@emotion/styled";

type TTextType = "primary" | "secondary";
type TTextSize = "small" | "medium" | "large" | "pageTitle";

const Text = styled.div<{
  type?: TTextType;
  weight?: 400 | 500;
  size?: TTextSize;
}>`
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ weight }) => weight ?? 500};
  color: #fff;
  ${({ size }) =>
    (() => {
      switch (size) {
        case "small":
          return "font-size: 14px; line-height: 20px;";
        case "medium":
          return "font-size: 16px; line-height: 24px;";
        case "large":
          return "font-size: 26px;line-height: 34px;";
        case "pageTitle":
          return "font-size: 40px;line-height: 56px;";
        default:
          return "font-size: 16px; line-height: 24px;";
      }
    })()}
`;

export default Text;

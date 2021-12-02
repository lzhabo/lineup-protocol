/** @jsx jsx */
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const MAX_WIDTH = 480;

export const layoutStyle = css`
  max-width: ${MAX_WIDTH}px;
  box-sizing: border-box;
  padding: 0 16px;
`;

const Layout = styled.div`
  ${layoutStyle}
`;

export default Layout;

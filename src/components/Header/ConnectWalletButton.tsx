import styled from "@emotion/styled";
import React from "react";
import * as avatar from "identity-img";
import SizedBox from "@components/SizedBox";
import { ReactComponent as Arrow } from "@src/assets/icons/arrowDown.svg";
import centerEllipsis from "@src/utils/centerEllipsis";

interface IProps {}

const Root = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;

  height: 40px;
  background: #1f1e25;
  border-radius: 20px;
`;

const address = "3P6Z6FcMTRHTdNe7FnvzT2WaAcsuJWPZjUF";

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Address = styled.div`
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
`;

const ConnectWalletButton: React.FC<IProps> = () => {
  avatar.config({
    rows: 8,
    cells: 8,
  });

  const src = address ? avatar.create(address, { size: 24 * 3 }) : "";
  return (
    <Root>
      <Avatar src={src} alt="Avatar" />
      <Address>{centerEllipsis(address, 6)}</Address>
      <SizedBox width={24} />
      <Arrow style={{ marginRight: 10 }} />
    </Root>
  );
};
export default ConnectWalletButton;

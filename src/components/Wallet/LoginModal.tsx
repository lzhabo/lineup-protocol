import React from "react";
import Dialog from "@components/Dialog";
import { LOGIN_TYPE } from "@stores/AccountStore";
import metamask from "@src/assets/icons/metamask.svg";
import trustWallet from "@src/assets/icons/trustWallet.svg";
import { observer } from "mobx-react-lite";
import LoginType from "./LoginType";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { useStores } from "@stores";

interface IProps {
  onClose: () => void;
  // onLogin: (loginType: LOGIN_TYPE) => void;
  visible: boolean;
}

const LoginModal: React.FC<IProps> = ({ ...rest }) => {
  const { accountStore } = useStores();
  return (
    <Dialog
      style={{ maxWidth: 400, maxHeight: 196 }}
      title="Connect wallet"
      {...rest}
    >
      <LoginType
        type={LOGIN_TYPE.METAMASK}
        title="MetaMask"
        onClick={accountStore.metamaskLogin}
        icon={metamask}
      />
      <LoginType
        type={LOGIN_TYPE.METAMASK}
        title="Trust Wallet"
        icon={trustWallet}
      />
      <SizedBox height={16} />
      <Text weight={500} textAlign="center">
        <span style={{ color: "#A2A2C0" }}> New to LineUp? </span> Learn more
        about wallets
      </Text>
    </Dialog>
  );
};

export default observer(LoginModal);

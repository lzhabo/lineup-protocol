import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";
import Web3 from "web3";
import { toast } from "react-toastify";
import BN from "@src/utils/BN";
import tokens from "@src/constants/tokens.json";
import erc20Abi from "@src/constants/erc20Abi.json";
export enum LOGIN_TYPE {
  TRUST_WALLET = "TRUST_WALLET",
  METAMASK = "METAMASK",
}

export interface ISerializedAccountStore {}

export enum CHAIN_ID {
  BSC = 56,
  BSC_TESTNET = 97,
}

export const RPC_URLS = {
  [CHAIN_ID.BSC]: ["https://bsc-dataseed.binance.org/"],
  [CHAIN_ID.BSC_TESTNET]: ["https://bsc.testnet.eywa.fi"],
};

export interface TBalance {
  amount: BN;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  chainId: CHAIN_ID;
}
export const EXPLORER = {
  [CHAIN_ID.BSC]: {
    name: "BscScan",
    url: "https://bscscan.com/",
  },
  [CHAIN_ID.BSC_TESTNET]: {
    name: "BscScan",
    url: "https://testnet.bscscan.com",
  },
};

export const CHAIN_ID_DETAILS = {
  [CHAIN_ID.BSC]: {
    chainName: "BNB Chain",
    chainId: CHAIN_ID.BSC,
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: RPC_URLS[CHAIN_ID.BSC],
    blockExplorerUrls: [EXPLORER[CHAIN_ID.BSC].url],
  },
  [CHAIN_ID.BSC_TESTNET]: {
    chainName: "BNB Chain Testnet",
    chainId: CHAIN_ID.BSC_TESTNET,
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: RPC_URLS[CHAIN_ID.BSC_TESTNET],
    blockExplorerUrls: [EXPLORER[CHAIN_ID.BSC_TESTNET].url],
  },
};

class AccountStore {
  public readonly rootStore: RootStore;
  web3 = new Web3(Web3.givenProvider);
  address: string | null = null;
  setAddress = (address: string) => (this.address = address);
  installed = false;
  private setInstalled = (v: boolean) => (this.installed = v);
  constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.web3.eth
      .getAccounts()
      .then((accounts) => {
        this.setInstalled(true);
        if (accounts.length > 0) {
          this.metamaskLogin().then(this.syncBalances);
        }
      })
      .catch(() => {
        this.setInstalled(false);
        toast("Metamask is not installed", { type: "error" });
      });
    setInterval(this.syncBalances, 10000);
  }
  balances: TBalance[] = [];
  setBalances = (balances: TBalance[]) => (this.balances = balances);
  syncBalances = async () => {
    if (!this.installed || this.address == null) return;
    const balances = await Promise.all(
      tokens.map(async (t) => {
        const contr = new this.web3.eth.Contract(erc20Abi as any, t.address);
        const amount = await contr.methods.balanceOf(this.address).call();
        return {
          ...t,
          amount: new BN(amount),
        } as TBalance;
      })
    );
    this.setBalances(balances);
  };

  metamaskLogin = async () => {
    const accounts = await this.web3.eth.requestAccounts();
    this.setAddress(accounts[0] ?? null);
    const chainId = await this.web3.eth.getChainId();
    if (!Object.values(CHAIN_ID).includes(chainId)) {
      await this.switchChain(CHAIN_ID.BSC_TESTNET);
    }
  };

  disconnect = () => {
    // console.log(this.web3.eth.currentProvider);
    // (this.web3.eth.currentProvider as HttpProvider).disconnect();
  };

  switchChain = async (chainId: CHAIN_ID) => {
    await (this.web3.eth.currentProvider as any).send(
      "wallet_addEthereumChain",
      [{ ...CHAIN_ID_DETAILS[chainId], chainId: `0x${chainId.toString(16)}` }]
    );
    await (this.web3.eth.currentProvider as any).send(
      "wallet_switchEthereumChain",
      [{ chainId: `0x${chainId.toString(16)}` }]
    );
  };

  serialize = (): ISerializedAccountStore => ({});
}

export default AccountStore;

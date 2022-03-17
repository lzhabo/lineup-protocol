import RootStore from "@stores/RootStore";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import BN from "@src/utils/BN";
import tokens from "@src/constants/tokens.json";
import erc20Abi from "@src/constants/erc20Abi.json";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";

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

  //wallet address
  address: string | null = null;
  setAddress = (address: string) => (this.address = address);

  //is metamask installed
  installed = false;
  private setInstalled = (v: boolean) => (this.installed = v);

  //ethers provider
  provider: Web3Provider | null = null;
  setProvider = (provider: Web3Provider) => (this.provider = provider);

  //ethers signer
  signer: JsonRpcSigner | null = null;
  setSigner = (signer: JsonRpcSigner) => (this.signer = signer);

  constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    try {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new Web3Provider((window as any).ethereum);
      this.setProvider(provider);

      //If there is some accounts connected we will login
      provider
        .listAccounts()
        .then((accounts) => {
          this.setInstalled(true);
          if (accounts.length > 0) {
            this.metamaskLogin().then(this.syncBalances);
          }
        })
        .then(this.disconnect);
    } catch (e) {
      this.setInstalled(false);
      toast("Metamask is not installed", { type: "error" });
    }

    setInterval(this.syncBalances, 10000);
  }

  balances: TBalance[] = [];
  setBalances = (balances: TBalance[]) => (this.balances = balances);
  syncBalances = async () => {
    if (!this.installed || this.address == null || this.provider == null) {
      return;
    }
    const balances = await Promise.all(
      tokens.map(async (t) => {
        const contr = new Contract(t.address, erc20Abi, this.provider!);
        const amount = await contr.balanceOf(this.address);
        return {
          ...t,
          amount: new BN(amount),
        } as TBalance;
      })
    );
    this.setBalances(balances);
  };

  metamaskLogin = async () => {
    if (this.provider == null) return;
    // MetaMask requires requesting permission to connect users accounts
    const accounts = await this.provider.send("eth_requestAccounts", []);
    this.setAddress(accounts[0] ?? null);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = this.provider.getSigner();
    this.setSigner(signer);

    const network = await this.provider.getNetwork();

    if (!Object.values(CHAIN_ID).includes(network.chainId)) {
      await this.switchChain(CHAIN_ID.BSC_TESTNET);
    }
  };

  disconnect = () => {};

  switchChain = async (chainId: CHAIN_ID) => {
    await this.provider?.send("wallet_addEthereumChain", [
      { ...CHAIN_ID_DETAILS[chainId], chainId: `0x${chainId.toString(16)}` },
    ]);
    await this.provider?.send("wallet_switchEthereumChain", [
      { ...CHAIN_ID_DETAILS[chainId], chainId: `0x${chainId.toString(16)}` },
    ]);
  };

  serialize = (): ISerializedAccountStore => ({});
}

export default AccountStore;

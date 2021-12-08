import { Undefinable } from "tsdef";

// import { IAccountStoreInitState } from '@stores/AccountStore/AccountStore';
import { ISerializedStore } from "@stores/RootStore";
import { IAccountStoreInitState } from "@stores/AccountStore";

export const load = <T>(key: string): Undefinable<T> => {
  try {
    const state: T = JSON.parse(localStorage.getItem(key) as string);
    return state || undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const save = <T>(value: T, key: string): void =>
  localStorage.setItem(key, JSON.stringify(value));

export enum WALLET_STORAGE_KEY {
  WALLET_1 = "wallet1",
  WALLET_2 = "wallet2",
}

export const loadState = (): Undefinable<ISerializedStore> =>
  load<ISerializedStore>("store");
export const saveState = (state: ISerializedStore): void =>
  save<ISerializedStore>(state, "store");

export const loadWallet = (
  key: WALLET_STORAGE_KEY
): Undefinable<IAccountStoreInitState> => load<IAccountStoreInitState>(key);
export const saveWallet = (
  state: IAccountStoreInitState,
  key: WALLET_STORAGE_KEY
): void => save<IAccountStoreInitState>(state, key);

import { useContext, createContext } from "react";
import { KeyedMutator } from "swr";
import { Era } from "../types";

export interface SignInFlowProp {
  entry: string | null;
  type: string | null;
  setEntry: (v: string | null) => void;
  setType: (v: string | null) => void;
}

export interface AccountInfo {
  id: number;
  handle: string;
  privileges: number[];
}
export interface AccountContextProp {
  account: AccountInfo | null;
  isLoading: boolean;
  setAccount: (account: AccountInfo | null) => void;
  setIsLoading: (value: boolean) => void;
}

export const SignInFlowContext = createContext<SignInFlowProp | null>(null);
export const AuthContext = createContext<AccountContextProp | undefined>(
  undefined
);
export function useSignInFlowContext() {
  const context = useContext(SignInFlowContext);

  if (context == null) throw new Error("Context must be within Provider");

  return context;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Auth Context used outside provider");
  return context;
}

export const EraPageMutatorContext = createContext<
  { mutate: KeyedMutator<Era> } | undefined
>(undefined);

export function useEraPageContext() {
  const context = useContext(EraPageMutatorContext);

  if (context === undefined)
    throw new Error("Auth Context used outside provider");
  return context;
}

import { useContext, createContext } from "react";

export interface SignInFlowProp {
  entry: string | null;
  type: string | null;
  setEntry: (v: string | null) => void;
  setType: (v: string | null) => void;
}

export interface AccountInfo {
  id: number;
  handle: string;
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

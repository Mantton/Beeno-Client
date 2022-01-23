import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { AuthContext, useAuthContext } from "../lib/hooks/auth";
import { useState } from "react";
import { AccountInfo } from "../lib/hooks/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{ account, setAccount, isLoading, setIsLoading }}
    >
      <Layout>
        {" "}
        <Component {...pageProps} />{" "}
      </Layout>
    </AuthContext.Provider>
  );
}

export default MyApp;

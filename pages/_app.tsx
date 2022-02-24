import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { AuthContext, useAuthContext } from "../lib/hooks/auth";
import { useEffect, useState } from "react";
import { AccountInfo } from "../lib/hooks/auth";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/me ", { withCredentials: true })
      .then((response) => {
        setAccount(response.data);
      })
      .catch((err) => {
        // TODO: Do something
      });
  }, [setAccount]);
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

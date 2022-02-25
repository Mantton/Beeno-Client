import "../styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { AuthContext, useAuthContext } from "../lib/hooks/auth";
import { useEffect, useState } from "react";
import { AccountInfo } from "../lib/hooks/auth";
import { API_URL } from "../lib/constants";

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState<AccountInfo | null>(pageProps.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{ account, setAccount, isLoading, setIsLoading }}
    >
      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
    </AuthContext.Provider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const defaultResponse = {
    pageProps: {
      ...appProps.pageProps,
      user: null,
    },
  };
  const req = context.ctx.req;

  if (!req) return defaultResponse;

  const regex = /beeno-session=*/;

  if (!req.headers.cookie?.match(regex)) return defaultResponse;

  try {
    // TODO: Investigate potential risks doing the below logic
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        cookie: req.headers.cookie,
      },
    });
    const user = await res.json();
    defaultResponse.pageProps.user = user;
    return defaultResponse;
  } catch (err) {
    return defaultResponse;
  }
};
export default MyApp;

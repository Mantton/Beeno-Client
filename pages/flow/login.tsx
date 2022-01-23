import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import SignInForm from "../../components/flow/signin/base";
import { SignInFlowProp, SignInFlowContext } from "../../lib/hooks/auth";
export default function LoginPage() {
  const [entry, setEntry] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="Log In" content="Login to beeno" />
      </Head>
      <div className="bg-primary m-24 rounded-lg shadow-lg px-8 pt-6 pb-8">
        <div className="grid p-10 justify-center">
          <div className="flex p-1 justify-center">
            <Image src="/logo.png" width={45} height={45} alt="logo"></Image>
          </div>
          <SignInFlowContext.Provider
            value={{ entry, type, setEntry, setType }}
          >
            <SignInForm></SignInForm>
          </SignInFlowContext.Provider>
        </div>
      </div>
    </>
  );
}

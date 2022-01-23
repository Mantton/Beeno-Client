import Head from "next/head";
import Image from "next/image";
import RegisterFlow from "../../components/flow/register";
export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="bg-primary m-24 rounded-lg shadow-md px-8 pt-6 pb-8">
        <div className="grid p-10 justify-center">
          <div className="flex p-1 justify-center">
            <Image src="/logo.png" width={45} height={45} alt="logo"></Image>
          </div>

          <RegisterFlow></RegisterFlow>
        </div>
      </div>
    </>
  );
}

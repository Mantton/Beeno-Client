import { useContext } from "react";
import { AuthContext } from "../../lib/hooks/auth";
import Link from "next/link";
export default function NavAuthButton() {
  const context = useContext(AuthContext);

  if (!context?.account) {
    return (
      <Link href={"/flow/login"}>
        <a className="px-2 py-1 bg-primary rounded-md text-black text-bold shadow-md">
          Login
        </a>
      </Link>
    );
  }
  return (
    <>
      <Link href={`/collector/${context.account.handle}`}>
        <a>@{context.account.handle}</a>
      </Link>
    </>
  );
}

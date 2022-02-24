import { useContext } from "react";
import { AuthContext } from "../../lib/hooks/auth";
import Link from "next/link";
export default function NavAuthButton() {
  const context = useContext(AuthContext);

  const account = context?.account;
  if (!account) {
    return (
      <Link href={"/flow/login"}>
        <a className="px-2 py-1 bg-primary rounded-md text-white text-bold shadow-md">
          Login
        </a>
      </Link>
    );
  }
  return (
    <>
      <div className="flex justify-center">
        <Link href={`/collector/${account.handle}`}>
          <a className="px-2 py-1 bg-primary rounded-md text-white text-bold shadow-md">
            @{account.handle}
          </a>
        </Link>
      </div>
    </>
  );
}

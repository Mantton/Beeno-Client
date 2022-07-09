import { useContext } from "react";
import { AuthContext, useAuthContext } from "../../../hooks/auth";
import Link from "next/link";
import { FiAward, FiBarChart2, FiTag, FiUser } from "react-icons/fi";
import { BsFilePerson } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
export default function NavAuthButton() {
  const context = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const account = context?.account;
  const accountPath = account ? `/collector/${account.handle}` : "/flow/login";
  const listStyle =
    "py-2 transition-colors duration-300 hover:bg-red-300 hover:bg-opacity-40";
  return (
    <>
      <div
        className="relative group transition-all duration-500 flex items-center text-2xl bg-red-100 hover:bg-red-200 p-2 rounded-full"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Link href={accountPath}>
          <a>
            <FiUser />
          </a>
        </Link>
        <Transition
          as={Fragment}
          show={show}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute -right-4 top-0 mt-12 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-red-50 shadow-lg">
            <ul className="py-2  text-lg font-light">
              <li className={listStyle}>
                <Link href={accountPath}>
                  <a
                    className="w-full px-4 flex items-center gap-2 "
                    onClick={() => setShow(false)}
                  >
                    <FiUser />
                    <span> Profile </span>
                  </a>
                </Link>
              </li>
              <li className={listStyle}>
                <Link href="/leaderboard">
                  <a
                    className="w-full px-4 flex items-center gap-2  "
                    onClick={() => setShow(false)}
                  >
                    <FiAward />
                    <span> Leaderboard </span>
                  </a>
                </Link>
              </li>
              <li className={listStyle}>
                <Link href="/hub">
                  <a
                    className="w-full px-4 flex items-center gap-2 "
                    onClick={() => setShow(false)}
                  >
                    <FiTag />
                    <span> Trade Hub </span>
                  </a>
                </Link>
              </li>

              {account && (
                <li className={listStyle}>
                  <Link href="/">
                    <a
                      className="w-full px-4 flex items-center gap-2 "
                      onClick={() => setShow(false)}
                    >
                      <FiUser />
                      <span> Sign Out </span>
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </Transition>
      </div>
    </>
  );
}

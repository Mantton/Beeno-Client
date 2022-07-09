import { SearchIcon } from "@heroicons/react/outline";
import NavAuthButton from "./buttons/authButton";
import ExploreButton from "./buttons/exploreButton";
import Link from "next/link";
import Image from "next/image";
import React from "react";
export default function Header() {
  return (
    <header className="sticky top-0 z-20 shadow-sm bg-white">
      <nav className="py-3 px-4 flex gap-6 justify-between items-center">
        <Link href="/">
          <a>
            <div className="flex items-center ">
              <div className="relative h-[40px] w-[40px]">
                <Image
                  src={"/logo.png"}
                  alt="logo"
                  layout="fill"
                  className="object-cover rounded-full"
                ></Image>
              </div>
              <span className=" ml-1.5 text-2xl font-bold">Beeno</span>
            </div>
          </a>
        </Link>

        <form action="/" method="get" className="flex">
          <input
            type="text"
            className="w-full border border-gray-450 bg-grey-lighter text-grey-darker border-grey-lighter rounded-md h-10 px-4 focus:outline-none outline-primary rounded-r-none border-r-0"
            placeholder="Search Artists, Eras, Collections"
            size={60}
          />

          <button type="submit">
            <SearchIcon className="h-10 w-10 px-2 py-2 bg-gray-300 rounded-r-md">
              {" "}
            </SearchIcon>
          </button>
        </form>

        <div className="flex items-center gap-2 pr-4">
          <ExploreButton />
          <NavAuthButton />
        </div>
      </nav>
    </header>
  );
}

import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
const options = [
  {
    name: "All Cards",
    href: "/cards",
  },
  {
    name: "Companies",
    href: "/companies",
  },
  {
    name: "Groups",
    href: "/groups",
  },
  {
    name: "Artists",
    href: "/artists",
  },
  {
    name: "Eras",
    href: "/eras",
  },
];

export default function ExploreButton() {
  return (
    <div className="max-w-sm px-4">
      <Popover className="">
        {({}) => (
          <>
            <Popover.Button className="px-2 py-1  text-black text-bold ">
              <span>Explore</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 left-1/2 transform mt-8 px-2 w-screen max-w-md sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white  p-4 lg:grid-cols-1">
                    {options.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

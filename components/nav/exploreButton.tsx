import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const options = [
  {
    name: "All Cards",
    href: "##",
  },
  {
    name: "Companies",
    href: "/companies",
  },
  {
    name: "Groups",
    href: "##",
  },
  {
    name: "Artists",
    href: "##",
  },
  {
    name: "Eras",
    href: "##",
  },
  {
    name: "Card Sets",
    href: "##",
  },
];

export default function ExploreButton() {
  return (
    <div className="max-w-sm px-4">
      <Popover className="">
        {({}) => (
          <>
            <Popover.Button className="px-2 py-1 bg-primary rounded-md text-black text-bold shadow-md">
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
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                      </a>
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

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminPage() {
  const panels = [
    {
      label: "Companies",
      href: "company",
    },
    {
      label: "Groups",
      href: "groups",
    },
    {
      label: "Artists",
      href: "artists",
    },
    {
      label: "Eras",
      href: "eras",
    },
    {
      label: "Card Sets",
      href: "sets",
    },
  ];
  return (
    <div className="p-4 grid gap-4 grid-cols-4 justify-center">
      {panels.map((panel) => {
        return (
          <div key={panel.href}>
            <Link href={`/admin/${panel.href}`}>
              <a>
                <div className="flex justify-center p-6 bg-primary  rounded-lg shadow-lg text-white font-bold">
                  <p>{panel.label}</p>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

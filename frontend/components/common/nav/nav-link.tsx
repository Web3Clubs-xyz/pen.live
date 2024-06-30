"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navigation = [
  { name: "Bounties", href: "/bounties", current: true },
  { name: "Projects", href: "/projects", current: false },
  { name: "Hackathons", href: "#", current: false },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:ml-10 lg:block">
      <div className="flex space-x-4">
        {navigation.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                "rounded-md py-2 px-3 text-sm font-medium",
                {
                  "bg-indigo-700 text-white": pathname === link.href,
                }
              )}
            >
              <p className="block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

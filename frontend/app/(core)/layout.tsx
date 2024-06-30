import Search from "@/components/common/input/search";
import { SidebarNav } from "@/components/common/sidebar";
import SideBar from "@/components/common/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Web3Logo } from "@/constants/svg";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pen.Live Dashboard",
  description: "Search Pens and listed animals collections",
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/home",
  },
  {
    title: "Account",
    href: "/home/account",
  },
  {
    title: "Support",
    href: "/home/support",
  },
  {
    title: "Notifications",
    href: "/home/notifications",
  },
  {
    title: "Setting",
    href: "/home/setting",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={inter.className}>
        <div className="min-h-full">
          <div className="pb-32">
            <SideBar>{children}</SideBar>
          </div>
        </div>
      </body>
    </html>
  );
}

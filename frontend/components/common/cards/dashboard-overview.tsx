import { CaretUp, File } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const DashboardOverview = ({ element, key }: any) => {
  return (
    <Link
      href="/admin/property"
      key={key}
      className="flex flex-col items-start bg-white hover:bg-gradient-to-r from-gradient-light-blue to-gradient-deep-blue rounded-xl p-4 w-full group"
    >
      <span className="text-[#8082FF] group-hover:text-white group-hover:bg-[#ffffff15] p-3 flex flex-col items-center rounded-xl">
        {element.icon}
      </span>
      <h3 className="font-medium text-[#718096] group-hover:text-white my-2">
        {element.title}
      </h3>
      <h3 className="font-bold text-black group-hover:text-white text-3xl">
        {element?.stats}
      </h3>
      <p className="flex px-2 py-1 mt-2 border rounded-full group-hover:bg-white">
        <CaretUp size={24} color="#40B66B" weight="fill" />
        <span className="text-[#40B66B] pl-2">{element.percentage}</span> vs
        past month
      </p>
    </Link>
  );
};

export default DashboardOverview;

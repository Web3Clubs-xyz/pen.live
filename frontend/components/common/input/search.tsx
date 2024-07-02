"use client";

import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

const Search = () => {
  return (
    <div className="relative flex flex-col items-center w-full lg:w-[500px]">
      <MagnifyingGlass size={24} className="absolute left-2 top-2 text-muted-foreground" />
      <Input placeholder="Search" className="pl-10 rounded-full" />
    </div>
  );
};

export default Search;

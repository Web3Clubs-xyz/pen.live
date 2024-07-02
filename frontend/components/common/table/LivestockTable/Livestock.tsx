"use client";

import React from "react";
import { LivestockColumns } from "./columns";
import { LivestockType } from "@/types/api-types";
import LivestockTable from ".";
import { livestockSource } from "@/helpers/livestock-source";

const LivestockTableContainer = () => {
  const generateTblData = (item: LivestockType): LivestockType => {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      currentPrice: item.currentPrice,
      lastSellPrice: item.lastSellPrice,
      owner: item.owner,
      timeListed: item.timeListed,
    };
  };

  const tableData = Array.isArray(livestockSource)
    ? livestockSource
        .map((element) => generateTblData(element))
    : [];
  return <LivestockTable columns={LivestockColumns} data={tableData} />;
};

export default LivestockTableContainer;

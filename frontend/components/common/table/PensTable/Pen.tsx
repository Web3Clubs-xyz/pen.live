"use client";

import React from "react";
import PenTable from ".";
import { PenColumns } from "./columns";
import { PenType } from "@/types/api-types";
import { penSource } from "@/helpers/pen-source";

const PenTableContainer = () => {
  const generateTblData = (item: PenType): PenType => {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      tvl: item.tvl,
      farmerRevenue: item.farmerRevenue,
      gardenRevenue: item.gardenRevenue,
      platformRevenue: item.platformRevenue,
    };
  };

  const tableData = Array.isArray(penSource)
    ? penSource
        .map((element) => generateTblData(element))
    : [];
  return <PenTable columns={PenColumns} data={tableData} />;
};

export default PenTableContainer;

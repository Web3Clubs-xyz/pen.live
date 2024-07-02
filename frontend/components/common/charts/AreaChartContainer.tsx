import React from "react";
import { Card, Title, AreaChart } from "@tremor/react";
import Image from "next/image";
import { Clock } from "@phosphor-icons/react";

const AreaChartContainer = () => {
  const chartdata = [
    {
      date: "1 Aug",
      "Value Growth Curve": 5,
      "Value Growth Curve ": 26,
    },
    {
      date: "2 Aug",
      "Value Growth Curve": 35,
      "Value Growth Curve ": 50,
    },
    {
      date: "3 Aug",
      "Value Growth Curve": 13,
      "Value Growth Curve ": 39,
    },
    {
      date: "4 Aug",
      "Value Growth Curve": 47,
      "Value Growth Curve ": 61,
    },
    {
      date: "5 Aug",
      "Value Growth Curve": 26,
      "Value Growth Curve ": 44,
    },
    {
      date: "6 Aug",
      "Value Growth Curve": 59,
      "Value Growth Curve ": 74,
    },
  ];

  const dataFormatter = (number: number) => {
    return "$" + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <div>
      <Card className="my-1">
        <span className="flex flex-col justify-start items-start">
          <Title>Value Growth Curve</Title>
          <h3 className="font-bold text-black group-hover:text-white text-3xl">
        $730
      </h3>
        </span>
        <AreaChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          yAxisWidth={60}
          categories={[
            "Value Growth Curve",
            "Value Growth Curve ",
          ]}
          colors={["indigo", "cyan"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
};

export default AreaChartContainer;

"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CowNFT, CowNFT2, CowPen } from "@/constants/img";
import { SealCheck, Share } from "@phosphor-icons/react";
import {
  DiscordLogoIcon,
  Share1Icon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import DashboardOverview from "../cards/dashboard-overview";
import { dashboardOverviewSource } from "@/helpers/dashboard-overview-source";
import LivestockTableContainer from "../table/LivestockTable/Livestock";

export default function LivestockPage() {
  return (
    <div className="rounded-md">
      <div className="rounded-md">
        <Image
          className="h-32 w-full object-cover lg:h-48 rounded-md"
          src={CowPen}
          alt=""
        />
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Image
              className="h-24 w-24 rounded-xl ring-4 ring-white sm:h-32 sm:w-32"
              src={CowNFT2}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                Helga Community Pens
              </h1>
              <span className="flex items-center">
                <h4>
                  By <b>Helga Farms</b>
                </h4>
                <SealCheck size={16} color="#2081E2" weight="fill" />
              </span>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                type="button"
                className="inline-flex justify-center rounded-full bg-white p-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <TwitterLogoIcon
                  className=" h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-full bg-white p-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <DiscordLogoIcon
                  className=" h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-full bg-white p-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Share1Icon
                  className=" h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-10 justify-between">
          <span className="flex justify-between">
            <h4>Farmer ID:</h4>
            <b>324-234-234</b>
          </span>
          <span className="flex justify-between">
            <h4>Guardian ID:</h4>
            <b>324-234-234</b>
          </span>
          <span className="flex justify-between">
            <h4>Guardian Fee:</h4>
            <b>5%</b>
          </span>
        </div>
        <div className="flex mt-5">
          <Image src={CowNFT} alt="" className="w-[500px] rounded-md" />
          <article>
            <h1 className="text-gradient-deep-blue">#8201</h1>
            <h3>Owned by RapidCapital</h3>
            <h4>current price</h4>
            <h2 className="text-gradient-light-blue">$700</h2>
          </article>
        </div>
      </div>
    </div>
  );
}

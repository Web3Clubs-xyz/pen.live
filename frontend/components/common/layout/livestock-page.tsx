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
import AreaChartContainer from "../charts/AreaChartContainer";
import { Fragment } from "react";

const description = [
  {
    title: "Health",
    answer:
      "Excellent, regularly checked by a veterinarian",
  },
  {
    title: "Age",
    answer:
      "3 years",
  },
  // More description...
];

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
        <div>
          <div className="flex flex-col lg:flex-row mt-5 ">
            <div>
              <Image src={CowNFT} alt="" className="w-full lg:w-[500px] rounded-md" />
              <div className="w-full my-1">
                <article className="bg-white p-5 rounded-md w-full flex flex-col justify-between shadow-sm">
                  <Tabs defaultValue="description" className="w-auto">
                    <TabsList>
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="ownership">Ownership</TabsTrigger>
                      <TabsTrigger value="stats">Statistics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="w-full lg:w-[400px]">
                      <h4>Discover the exceptional quality of our Freshian Arabian Female Dairy Cow! This premium breed combines the superior milk production of the Freshian with the hardy, adaptable nature of the Arabian. She is a perfect addition to any dairy farm, offering high yields of rich, creamy milk. Raised with the utmost care, she is healthy, well-tempered, and ready to enhance your herd. Don’t miss the chance to invest in this outstanding dairy cow and boost your farm’s productivity. Contact us today to learn more and arrange a visit!</h4>
                      <dl className="">
                        {description.map((faq) => (
                          <Fragment key={faq.title}>
                            <dt className="mt-10 font-medium text-gray-900">
                              {faq.title}
                            </dt>
                            <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                              <p>{faq.answer}</p>
                            </dd>
                          </Fragment>
                        ))}
                      </dl>
                    </TabsContent>
                    <TabsContent value="ownership" className="w-full lg:w-[400px]">
                      <h2>Analytics</h2>
                    </TabsContent>
                    <TabsContent value="stats" className="w-full lg:w-[400px]">
                      <h2>Activity</h2>
                    </TabsContent>
                  </Tabs>
                </article>
              </div>
            </div>
            <div className="w-full p-2">
              <article className="bg-white p-5 rounded-md w-full flex flex-col justify-between shadow-sm">
                <h1 className="text-gradient-deep-blue text-3xl font-bold">
                  #8201
                </h1>
                <h3 className="text-lg">Owned by RapidCapital</h3>
                <div>
                  <p className="mt-2 text-sm text-gray-500">current price</p>
                  <span className="flex">
                    <h2 className="text-gradient-deep-blue text-3xl font-bold">
                      0.23 ETH
                    </h2>
                    <p className="mt-2 text-lg   text-gray-500 font-semibold">
                      $700
                    </p>
                  </span>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Make Offer
                  </button>
                </div>
              </article>
              <AreaChartContainer />
              <AreaChartContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

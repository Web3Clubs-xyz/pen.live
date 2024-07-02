export type PenType = {
    id:string;
    name:string;
    slug:string;
    tvl:string;
    farmerRevenue:string;
    gardenRevenue:string;
    platformRevenue:string;
}

export type LivestockType = {
    id:string;
    name:string;
    slug: string;
    currentPrice: string;
    lastSellPrice: string;
    owner: string;
    timeListed: string;
}
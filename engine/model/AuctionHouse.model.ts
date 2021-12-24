import { Auction, AuctionInfo } from "hypixel-api-reborn";

export interface AuctionHouse{
    timestamp: number;
    auctions: Auction[];
    info: AuctionInfo;
    
}
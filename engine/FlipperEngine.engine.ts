import { Auction, AuctionInfo, Client } from "hypixel-api-reborn";
import { AuctionHouse } from "./model/AuctionHouse.model";
import axios from 'axios';


class FlipperEngine{
    public hypixel:Client = new Client("1280ff6c-dfda-4f07-9186-50525143df19");
    private ah: AuctionHouse = {"timestamp":0,"auctions": [],"info":{"age":0,"page":0,"totalPages":0,"totalAuctions":0,"lastUpdated":0,"lastUpdatedAt":new Date(),"failedPages":[]}}

    public async GetAh(): Promise<any>{

        var page = await axios.get("https://api.hypixel.net/skyblock/auctions?page=0");

        var allPages: Promise<any>[] = [];


        for(var i = 0; i < page.data.totalPages - 1; i++){
            
             allPages.push( axios.get(`https://api.hypixel.net/skyblock/auctions?page=${i}`).then(res =>{
                 var allAucItems : any[]= [];
                 
                 for(var j = 0; j < res.data.auctions.length; j++){
                     if(res.data.auctions[j] == undefined){
                         continue;
                     }
                     if(res.data.auctions[j].highest_bid_amount != 0){

                         allAucItems.push({"aucid":res.data.auctions[j].uuid,"item":res.data.auctions[j].item_name,"price":res.data.auctions[j].highest_bid_amount,"time":res.data.auctions[j].end - Date.now(),"bin":res.data.auctions[j].bin,"lore":res.data.auctions[j].item_lore,"bids":res.data.auctions[j].bids,"item_bytes":res.data.auctions[j].item_bytes,"start":res.data.auctions[j].start,"end":res.data.auctions[j].end});
                     }else{
                         allAucItems.push({"aucid":res.data.auctions[j].uuid,"item":res.data.auctions[j].item_name,"price":res.data.auctions[j].starting_bid,"time":res.data.auctions[j].end  - Date.now(),"bin":res.data.auctions[j].bin,"lore":res.data.auctions[j].item_lore,"bids":res.data.auctions[j].bids,"item_bytes":res.data.auctions[j].item_bytes,"start":res.data.auctions[j].start,"end":res.data.auctions[j].end});
                     }
                     
                 }
                 
                 return allAucItems;
             }).catch(e =>{
                 return undefined;
             }));
             
        }
       
        return Promise.all(allPages).then((data: any[][]) =>{
         //FlipperUtil.makingrequest = false;
         var end = Date.now();
         var allactiveItems : any[] = [];
         //console.log(data);
         
         if(data !== []){
             for(var i = 0; i < data.length; i++){
                 if(data[i] == undefined){
                     continue;
                 }
                 if(data[i].length != 0){
                     for(var j = 0; j < data[i].length; j++){
                         allactiveItems.push({"item":data[i][j].item,"aucid":data[i][j].aucid,"price":data[i][j].price,"bin":data[i][j].bin,"time":data[i][j].time,"lore":data[i][j].lore,"bids":data[i][j].bids,"item_bytes":data[i][j].item_bytes,"start":data[i][j].start,"end":data[i][j].end});
                     }
                    
                 }
             }
             
             return allactiveItems;
         }else{
             return undefined;
         }
         
        });
        
    }
}

export default new FlipperEngine();
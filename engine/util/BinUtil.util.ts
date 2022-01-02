import betterfs from 'fs-extra';
import { Auction, AuctionInfo, ItemBytes } from 'hypixel-api-reborn';
import FlipperEngine from '../FlipperEngine.engine';
import { AuctionUtil } from './AuctionUtil.util';

export class BinUtil{
    public static sniped: any = {"timestamp":0,"auctions":[]}
    public static async GetAllBinFlips(){
        var bin = await betterfs.readJSON(__dirname +"/../../../cache/bin.json");

        bin.auctions = bin.auctions.sort((a: any, b: any): number =>{
            if(a.price < b.price){
                return -1;
            }else if(a.price > b.price){
                return 1;
            }else{
                return 0;
            }
        });

        var allitems = await betterfs.readJSON(__dirname +"/../../../cache/items.json");
        var allitemskeys = Object.keys(allitems);

        var lowest: Promise<any[]>[] = [];

        for(var i = 0; i < allitemskeys.length; i++){
            lowest.push(AuctionUtil.KeepIndex(i).then(index =>{
                return this.GetTwoLowestOfItem(bin.auctions,allitems[allitemskeys[index]].name,allitemskeys[index])
            }))
        }

        return Promise.all(lowest).then(items =>{
            var viableitems = [];
            for(var i = 0; i < items.length; i++){
                if(items[i][1] == undefined ||items[i][0] == undefined){
                    continue;
                }

                if(items[i][1].price - items[i][0].price > 0){
                    viableitems.push(items[i]);
                }
            }
            BinUtil.sniped = {"timestamp":Date.now(),"auctions":viableitems};

            betterfs.writeJSON(__dirname + "/../../../cache/binflips.json",{"timestamp":Date.now(),"auctions":viableitems});
            return viableitems;
        })

    }

    public static async GetTwoLowestOfItem(auctions:any[],itemname:string,itemid:string):Promise<any[]>{
        var twolowest: Auction[] = [];

        for(var i = 0; i < auctions.length; i++){
            if(twolowest.length >= 2){
                break;
            }

            if(auctions[i].item.toLowerCase().includes(itemname.toLowerCase())){
                if(auctions[i].item_bytes){
                    
                    var id = await AuctionUtil.GetAuctionItemID(auctions[i].item_bytes);
    
                    if(id == "ENCHANTED_BOOK") continue;
    
                    if(id == itemid){
                        twolowest.push(auctions[i]);
                    }
                }else{
                    return [];
                }

                
            }
        }

        if(twolowest.length < 2){
            return [];
        }

        return twolowest;


    }

    public static async SaveBinToFile():Promise<boolean>{
        var ah = await FlipperEngine.GetAh();

        var binauc: any[]= [];
        for(var i = 0; i < ah.length; i++){
            if(ah[i].bin != undefined){
                

                binauc.push({"item":ah[i].item,"item_bytes":ah[i].item_bytes,price:ah[i].price,"aucid":ah[i].aucid});
            }
        }

        await betterfs.writeJSON(__dirname + "/../../../cache/bin.json",{"auctions":binauc});


        return true;

    }
}
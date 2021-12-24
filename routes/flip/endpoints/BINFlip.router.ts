import { BinUtil } from '../../../engine/util/BinUtil.util';
import router from '../FlipperRouter.router';
import betterfs from 'fs-extra';

export class BINFlipEndpoint{
    public static async BINFlip(){
        router.GetRouter().post('/bin/flip',async function(req,res,next){
            if(BinUtil.sniped.timestamp <= 0){
                var file = await betterfs.readJSON(__dirname + "/../../../../cache/binflips.json")
                var viable: any[] = [];
        
                for(var i = 0; i < file.auctions.length; i++){
                    if(file.auctions[i][0] < req.body.profit){
                        continue;
                    }
    
                    if(file.auctions[i][1].price - file.auctions[i][0].price >= req.body.profit && file.auctions[i][1].price - file.auctions[i][0].price <= req.body.profit * 1.4){
                        viable.push({"item":file.auctions[i][0],"usual":file.auctions[i][1]})
                    }
                }
        
        
        
                res.json({"random":viable[Math.floor(Math.random() * viable.length)],all:viable});
            }else{
                var viable = [];
    
                for(var i = 0; i < BinUtil.sniped.auctions.length; i++){
                    if(BinUtil.sniped.auctions[i][0].price < req.body.profit){
                        continue;
                    }
    
                    if(BinUtil.sniped.auctions[i][1].price - BinUtil.sniped.auctions[i][0].price >= req.body.profit && BinUtil.sniped.auctions[i][1].price - BinUtil.sniped.auctions[i][0].price <= req.body.profit * 1.5){
                        viable.push({"item":BinUtil.sniped.auctions[i][0],"usual":BinUtil.sniped.auctions[i][1]});
                    }
    
                    
                }
    
                res.json({"random":viable[Math.floor(Math.random() * viable.length)],all:viable});
            }
        });
    }
}
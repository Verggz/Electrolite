import { CommandInteraction } from "discord.js";
import { SlashCommand } from "../../model/SlashCommand.model";

function nFormatter(num: any, digits: any) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }


export class BINFlipCommand extends SlashCommand{
    constructor(interaction:CommandInteraction){
        super(interaction);

        if(this.command == "binflip"){
            this.BinFlip();
        }
    }

    private async BinFlip(){
        await this.interaction.deferReply();
        var curtime = Date.now();
        var profit = this.interaction.options.getInteger("profit",true);

        var res = await this.http.post("https://electrolite.herokuapp.com/api/flipper/bin/flip",{"profit":profit}).catch(e =>{return});
        
        if(res && res.data.random){
          var finalEmbed = this.CreateEmbed()
          .setTitle("Found Profitable BIN Flip!")
          .setColor("#29B0E2")
          .setDescription(`***Type:${this.backtick}/viewauction ${res.data.random.item.aucid}${this.backtick} on hypixel skyblock to view the auction.***`)
          .addField("**Item**",`${this.backtick}${res.data.random.item.item}${this.backtick}`,true)
          .addField("**BIN ID**",`${this.backtick}${res.data.random.item.aucid}${this.backtick}`)
          .addField("**Usual Price**",`${this.backtick}${nFormatter(Math.round(res.data.random.usual.price),2)} coins${this.backtick}`,true)
          .addField("**BIN Flip Price**",`${this.backtick}${nFormatter(Math.round(res.data.random.item.price),2)} coins${this.backtick}`,true)
          .addField("**Profit**",`${this.backtick}${nFormatter((res.data.random.usual.price - res.data.random.item.price),2)} coins${this.backtick}`,true)
          .setFooter(`flipped in ${((Date.now() - curtime) / 1000).toFixed(2)}s | ${res.data.all.length} other BIN flips`);

          this.interaction.editReply({"embeds":[finalEmbed]});
        }else{
          var errorEmbed = this.CreateEmbed()
          .setTitle("**Couldn't find any flips at this price range**")
          .setColor("#C70039")
          .setDescription("**Couldn't find any flips around this price range, choose a different price range or try again in a bit**")

          this.interaction.editReply({"embeds":[errorEmbed]});
        }


    }
}
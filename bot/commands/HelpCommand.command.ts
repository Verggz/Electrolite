import { CommandInteraction } from "discord.js";
import { SlashCommand } from "../model/SlashCommand.model";

export class HelpCommand extends SlashCommand{
    constructor(interaction: CommandInteraction){
        super(interaction);

        if(this.command == "help"){
            this.Help();
        }
    }

    private async Help(){  
        await this.interaction.deferReply();
        var mainhelp = this.CreateEmbed()
        .setTitle("Project Scyll Help")
        .setColor("#29B0E2")
        .setDescription("**The current list of commands for Project: Scyll**")
        .addField("`/binflip [profit]`","**Finds a BIN snipe on the auction house based on the amount of profit you can make.**");

        this.interaction.editReply({"embeds":[mainhelp]});
    }
}
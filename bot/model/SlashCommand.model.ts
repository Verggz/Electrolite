
import { SlashCommandBuilder } from "@discordjs/builders";
import { ClientUser, ColorResolvable, CommandInteraction, Interaction, MessageEmbed } from "discord.js";
import * as axios from 'axios';
import {REST} from '@discordjs/rest';
import { Routes } from "discord-api-types/v9";
import fs from 'fs-extra';

var token = fs.readJSONSync("./config.json").SERVER_BOT_KEY


export class SlashCommand{
    public static REST : REST = new REST({"version":"9"}).setToken(token);
    http: axios.AxiosStatic;
    command: string;
    interaction: CommandInteraction;

    backtick:string;
    gold:ColorResolvable;
    red:ColorResolvable;
    purple:ColorResolvable;

    constructor(interaction: CommandInteraction){
        this.http = axios.default;
        this.interaction = interaction;
        this.command = interaction.commandName;

        this.purple = "#BA55D3";
        this.backtick = "`";
        this.gold = "#d4af37";
        this.red = "#C70039";
    }

    CreateEmbed(){
        return new MessageEmbed()
        .setAuthor("Project: Scyll",(this.interaction.client.user as ClientUser).avatarURL() as string).setFooter("Project:Scyll 0.1.0").setTimestamp();
    }

    public static async CreateSlashCommands(commands: any[]){
        var clientid: string = (await fs.readJSON("./config.json")).SERVER_CLIENT_ID;

        await SlashCommand.REST.put(Routes.applicationCommands(clientid),
        {"body":commands})

    }
}
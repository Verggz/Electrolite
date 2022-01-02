import Discord from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import { SlashCommand } from './model/SlashCommand.model';
import { HelpCommand } from './commands/HelpCommand.command';
import fs from 'fs-extra';
import { BINFlipCommand } from './commands/flip/BINFlipCommand.command';

var client = new Discord.Client({"intents":[Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MEMBERS,Discord.Intents.FLAGS.GUILD_MESSAGES]});

client.on('ready', async () =>{
    var helpcommandbuilder = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get the list of commands that Project: Scyll has.");

    var binflipcommandbuilder = new SlashCommandBuilder()
    .setName("binflip")
    .setDescription("Finds a BIN snipe on the auction house based on the amount of profit you can make.")
    .addIntegerOption(option => option.setName("profit")
    .setDescription("the amount of profit you would like to make.").setRequired(true));

    SlashCommand.CreateSlashCommands([helpcommandbuilder,binflipcommandbuilder]);
});

client.on('interactionCreate', async function(interaction){
    if(!interaction.isCommand()) return;

    new HelpCommand(interaction);
    new BINFlipCommand(interaction);
});

client.login(fs.readJSONSync("./config.json").SERVER_BOT_KEY);
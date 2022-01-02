"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const builders_1 = require("@discordjs/builders");
const SlashCommand_model_1 = require("./model/SlashCommand.model");
const HelpCommand_command_1 = require("./commands/HelpCommand.command");
const fs_extra_1 = __importDefault(require("fs-extra"));
const BINFlipCommand_command_1 = require("./commands/flip/BINFlipCommand.command");
var client = new discord_js_1.default.Client({ "intents": [discord_js_1.default.Intents.FLAGS.GUILDS, discord_js_1.default.Intents.FLAGS.GUILD_MEMBERS, discord_js_1.default.Intents.FLAGS.GUILD_MESSAGES] });
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    var helpcommandbuilder = new builders_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("Get the list of commands that Project: Scyll has.");
    var binflipcommandbuilder = new builders_1.SlashCommandBuilder()
        .setName("binflip")
        .setDescription("Finds a BIN snipe on the auction house based on the amount of profit you can make.")
        .addIntegerOption(option => option.setName("profit")
        .setDescription("the amount of profit you would like to make.").setRequired(true));
    SlashCommand_model_1.SlashCommand.CreateSlashCommands([helpcommandbuilder, binflipcommandbuilder]);
}));
client.on('interactionCreate', function (interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!interaction.isCommand())
            return;
        new HelpCommand_command_1.HelpCommand(interaction);
        new BINFlipCommand_command_1.BINFlipCommand(interaction);
    });
});
client.login(fs_extra_1.default.readJSONSync("./config.json").SERVER_BOT_KEY);

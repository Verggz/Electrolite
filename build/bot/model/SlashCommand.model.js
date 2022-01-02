"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SlashCommand = void 0;
const discord_js_1 = require("discord.js");
const axios = __importStar(require("axios"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const fs_extra_1 = __importDefault(require("fs-extra"));
var token = fs_extra_1.default.readJSONSync("./config.json").SERVER_BOT_KEY;
class SlashCommand {
    constructor(interaction) {
        this.http = axios.default;
        this.interaction = interaction;
        this.command = interaction.commandName;
        this.purple = "#BA55D3";
        this.backtick = "`";
        this.gold = "#d4af37";
        this.red = "#C70039";
    }
    CreateEmbed() {
        return new discord_js_1.MessageEmbed()
            .setAuthor("Project: Scyll", this.interaction.client.user.avatarURL()).setFooter("Project:Scyll 0.1.0").setTimestamp();
    }
    static CreateSlashCommands(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            var clientid = (yield fs_extra_1.default.readJSON("./config.json")).SERVER_CLIENT_ID;
            yield SlashCommand.REST.put(v9_1.Routes.applicationCommands(clientid), { "body": commands });
        });
    }
}
exports.SlashCommand = SlashCommand;
SlashCommand.REST = new rest_1.REST({ "version": "9" }).setToken(token);

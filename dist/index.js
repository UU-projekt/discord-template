"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const log75_1 = require("log75");
const logger_1 = tslib_1.__importDefault(require("./lib/logger/logger"));
const loadEvents_1 = tslib_1.__importDefault(require("./utils/loadEvents"));
const logger = new logger_1.default(log75_1.LogLevel.Debug, { color: true });
exports.logger = logger;
const bot = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
    ],
});
(0, loadEvents_1.default)(bot);
if (!process.env.DISCORD_AUTH_TOKEN) {
    logger.warn(`
        You need to provide a discord token.
        -> You can get one by creating an application at https://discord.com/developers/applications

        After that is done, copy the token and place it in the ".env" file
    `);
    process.exit(1);
}
bot.login(process.env.DISCORD_AUTH_TOKEN)
    .catch(err => {
    logger.error("failed to log in to discord.\n" + err);
});

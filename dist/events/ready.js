"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
function default_1(bot) {
    index_1.logger.info(`Logged in as ${bot.user?.username}!`);
    bot.user?.setPresence({ activities: [{ name: process.env.DISCORD_BOT_STATUS, type: discord_js_1.ActivityType.Custom }], status: "online" });
}
exports.default = default_1;

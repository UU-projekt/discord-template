import { ActivityType } from "discord.js";
import { logger } from "../index";
import ExtClient from "src/lib/extendedDiscord/ExtClient";

export default function(bot: ExtClient) {
    logger.info(`Logged in as ${bot.user?.username}!`)

    bot.user?.setPresence({ activities:[ { name: process.env.DISCORD_BOT_STATUS, type: ActivityType.Custom } ], status: "online" })
}
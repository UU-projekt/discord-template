import { ActivityType, Client } from "discord.js";
import { logger } from "../index";

export default function(bot: Client) {
    logger.info(`Logged in as ${bot.user?.username}!`)

    bot.user?.setPresence({ activities:[ { name: process.env.DISCORD_BOT_STATUS, type: ActivityType.Custom } ], status: "online" })
}
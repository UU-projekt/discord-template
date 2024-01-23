import { GatewayIntentBits } from "discord.js" 
import ExtClient from "./lib/extendedDiscord/ExtClient"
import { LogLevel } from "log75"
import Logger from "./lib/logger/logger"
import loadEvents from "./utils/loadEvents"

if(typeof process.env.DISCORD_BOT_OWNERS === "string") {
    process.env.DISCORD_BOT_OWNERS = process.env.DISCORD_BOT_OWNERS.split(",")
}

const logger = new Logger(LogLevel.Debug, { color: true })

const bot = new ExtClient({ 
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
})

loadEvents(bot)

export { logger, bot }

if(!process.env.DISCORD_AUTH_TOKEN) {
    logger.warn(`
        You need to provide a discord token.
        -> You can get one by creating an application at https://discord.com/developers/applications

        After that is done, copy the token and place it in the ".env" file
    `)

    process.exit(1)
}

bot.login(process.env.DISCORD_AUTH_TOKEN)
    .catch(err => {
        logger.error("failed to log in to discord.\n" + err)
    })
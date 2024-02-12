import { Message } from "discord.js";
import { logger } from "../index";
import ExtClient from "../lib/extendedDiscord/ExtClient";
import { ContextType } from "../lib/logger/logger";
import { checkGatekeeping } from "../utils/gatekeeping";

export default async function messageCreate(msg: Message) {
    const bot = msg.client as ExtClient
    if(!bot.user) return

    if(!msg.content.startsWith(process.env.DISCORD_BOT_PREFIX)) return

    const args = msg.content.substring(1).split(" ")

    if(bot.commands.text.has(args[0])) {
        const command = bot.commands.text.get(args[0])
        
        if(!await checkGatekeeping(msg, command)) return

        function log(txt: string, type: ContextType = "LOG") {
            logger.context(txt, `txt command ${args[0]} in ${msg.guildId}`, type)
        }

        try {
            await command?.run({ args: args, message: msg }, { log })
        } catch(error) {
            logger.context(`Un-caught error handled:\n${error}`, `txt command ${args[0]} in ${msg.guildId}`, "ERROR")
        }
        
    }
}
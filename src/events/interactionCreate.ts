import { BaseInteraction, ChatInputCommandInteraction } from "discord.js";
import ExtClient from "../lib/extendedDiscord/ExtClient";
import { ContextType } from "../lib/logger/logger";
import { logger } from "../index";
import { checkGatekeeping } from "../utils/gatekeeping";

async function slashCommandInteraction(interaction: ChatInputCommandInteraction) {
    const bot: ExtClient = interaction.client as ExtClient
    const command = bot.commands.slash.get(interaction.commandName)
    if(!interaction.channel) return

    if(!await checkGatekeeping(interaction, command)) return


    function log(txt: string, type: ContextType = "LOG") {
        logger.context(txt, `txt command ${interaction.commandName} in ${interaction.guildId}`, type)
    }

    try {
        await command?.run(interaction, { log })
    } catch(error) {
        logger.context(`Un-caught error handled:\n${error}`, `slash command ${interaction.commandName} in ${interaction.guildId}`, "ERROR")
    }
}

export default async function interactionCreate(interaction: BaseInteraction) {
    if(interaction.isChatInputCommand()) return slashCommandInteraction(interaction)
}
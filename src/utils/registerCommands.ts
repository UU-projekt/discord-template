import { REST, Routes } from "discord.js";
import { Command } from "../interfaces/command";
import { logger } from "../index";

export default async function registerCommands(commands: Command[], clientID: string, guildID?: string) {
    const rest = new REST().setToken(process.env.DISCORD_AUTH_TOKEN)

    try {
        logger.log(`Refreshing ${commands.length} application commands.`)

        let path: `/${string}`

        if(guildID) {
            path = Routes.applicationGuildCommands(clientID, guildID)
        } else {
            path = Routes.applicationCommands(clientID)
        }

        let cmds = []
        
        for(const command of commands) {
            cmds.push(command.data.toJSON())
        }

        await rest.put(
            path,
            { body: cmds }
        )

        logger.done(`successfully refreshed commands!`)
    } catch(err) {

    }
}
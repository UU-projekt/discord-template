import { TextCommand } from "src/interfaces/command";
import registerCommands from "../../../utils/registerCommands";
import ExtClient from "../../../lib/extendedDiscord/ExtClient";

const test: TextCommand = {
    name: "register",

    run: async (interaction, ctx) => {
        const bot: ExtClient = interaction.message.client as ExtClient
        const commands = Array.from(bot.commands.slash.values())

        // This will never be false but we gotta check to keep the type checker happy
        if(!bot.user) return

        try {
            if(interaction.args[1] === "local") {
                await registerCommands(commands, bot.user.id, interaction.message.guildId||"")
            } else if(interaction.args[1] === "global") {
                await registerCommands(commands, bot.user.id)
            } else {
                return interaction.message.reply(`Need to provide command registration context.\nMissing argument 1: \`local | global\``)
            }
        } catch(error) {
            interaction.message.reply(`Could not register commands.\n**error:** \`${error}\``)
        }

        interaction.message.reply("Registered slash commands successfully!")

    },

    gatekeeping: {
        ownerOnly: true
    }
}

export default test
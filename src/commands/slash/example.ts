import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/command";

const command: Command = {
    run: async (interaction, ctx) => {
        interaction.reply("Hello, TypeScript user! :D :D :D :D :D")
        ctx.log("whoa slash command", "LOG")
    },
    data: new SlashCommandBuilder()
        .setName("example")
        .setDescription("example command"),
    
    // check README.md for valid gatekeeping variables :)
    gatekeeping: {
        
    }
}

export default command
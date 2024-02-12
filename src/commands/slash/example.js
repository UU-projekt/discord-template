import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const command = {
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {{ log: function(string, "ERROR"|"LOG"|"WARNING") }} ctx 
     */
    run: async (interaction, ctx) => {
        interaction.reply("Hello, JavaScript user! :D (Dylan stinks)")
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
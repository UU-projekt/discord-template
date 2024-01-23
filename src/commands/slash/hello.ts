import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/command";

const hello: Command = {
    run: async (interaction, ctx) => {
        const greetings = [ "Hello", "Howdy", "Salutations", "Hi" ]
        interaction.reply(`${greetings[Math.floor(Math.random() * greetings.length)]}, ${interaction.user.username}`)
    },
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("says hello to the user")
}

export default hello
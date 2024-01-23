import { TextCommand } from "src/interfaces/command";

const test: TextCommand = {
    name: "hello",

    run: async (interaction, ctx) => {
        interaction.message.reply(`hi there, ${interaction.message.author.username}`)
        ctx.log("test test")
    },

    gatekeeping: {
        ownerOnly: true
    }
}

export default test
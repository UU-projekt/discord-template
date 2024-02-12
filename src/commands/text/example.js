import { Message } from "discord.js";

const command = {
    name: "example",

    /**
     * @param {{ message: Message, args: Array<string> }} message 
     * @param {{ log: function(string, "ERROR"|"LOG"|"WARNING") }} ctx 
     */
    run: async (message, ctx) => {
        
        const bot   =  message.message.client
        const msg   =  message.message
        const args  =  message.args

        msg.reply("hello, javascript user! :D")
        ctx.log("Something happened", "LOG")
    },

    // check README.md for valid gatekeeping variables :)
    gatekeeping: {
        
    }
}

export default command
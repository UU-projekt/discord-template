import { TextCommand } from "../../interfaces/command";
import ExtClient from "../../lib/extendedDiscord/ExtClient";

const command: TextCommand = {
    name: "example",
    run: async (message, ctx) => {
        const bot: ExtClient    =  message.message.client as ExtClient
        const msg               =  message.message
        const args              =  message.args

        msg.reply("hello, typescript user! :D")
        ctx.log("Something happened", "LOG")
    },

    // check README.md for valid gatekeeping variables :)
    gatekeeping: {
        
    }
}

export default command
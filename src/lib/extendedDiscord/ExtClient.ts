import { Client, ClientOptions } from "discord.js";
import { Command, TextCommand } from "../../interfaces/command";
import loadCommands from "../../utils/loadCommands";

type CommandContainer = {
    text:   Map<string, TextCommand>,
    slash:  Map<string, Command>
}

export default class ExtClient extends Client {
    public commands: CommandContainer = { text: new Map<string, TextCommand>(), slash: new Map<string, Command>() }
    constructor(options: ClientOptions) {
        super(options)

        this.loadCommands()
    }

    loadCommands(): void {
        const temp = loadCommands()

        this.commands.text  = temp.textCommands
        this.commands.slash = temp.slashCommands
    }
}
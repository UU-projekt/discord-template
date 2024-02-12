import { readdirSync, statSync } from "fs"
import path from "path"
import { logger } from "../index"
import { Command, TextCommand } from "../interfaces/command"
import { Client } from "discord.js"

function isSlashCommand(object: any): object is Command {
    return "data" in object
}

function isTextCommand(object: any): object is TextCommand {
    return "name" in object
}

export default function loadCommands(baseDir: string = "../commands/", dirDive: string = "") {
    let slashCommands = new Map<string, Command>()
    let textCommands = new Map<string, TextCommand>()

    const p = path.join(__dirname, baseDir + (dirDive ? dirDive : ""))
    for(let file of readdirSync(p)) {
        const fileStat = statSync(path.join(p, file))
        if(fileStat.isFile() && file.endsWith(".js") && !file.startsWith("example")) {
            delete require.cache[ require.resolve(`../commands/${dirDive}/${file}`) ]
            const cmdReq = require(`../commands/${dirDive}/${file}`)?.default
            if(!cmdReq) {
                logger.warn(`"${baseDir}${dirDive}${file}" command does not export a default object`)
                continue;
            }
            
            if(isSlashCommand(cmdReq)) {
                slashCommands.set(file.split(".")[0], cmdReq)
            } else if(isTextCommand(cmdReq)) {
                textCommands.set(cmdReq.name, cmdReq)
            } else {
                logger.warn(`${file} is not a slash command or text command`)
            }
            
        } else if(fileStat.isDirectory()) {
            const temp = loadCommands(baseDir, dirDive + `${file}/`)
            slashCommands = new Map<string, Command>([...slashCommands, ...temp.slashCommands])
            textCommands = new Map<string, TextCommand>([...textCommands, ...temp.textCommands])
        }
    }
    return { slashCommands, textCommands }
}
import { Client } from "discord.js"
import { readdirSync } from "fs"
import { logger } from "../index"

/**
 * 
 * @param client The client to register the events on.
 * @param refresh removes old listener if set to true
 */
export default function(client: Client, refresh: Boolean = false) {
    logger.debug(`Loading events...`)
    readdirSync("./dist/events").forEach( file => {
        if(file.endsWith(".js")) {
            const cmd = require(`../events/${file}`).default
            const eventName = file.split(".")[0]
            logger.debug(`Loading event "${eventName}"`)
            if(refresh) client.removeListener(eventName, () => { })
            client.addListener(eventName, cmd)
        }
    } )
}
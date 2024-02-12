import { CommandInteraction, Message } from "discord.js"
import { logger } from "../index"
import { Api } from "@top-gg/sdk"
import { BaseCommand } from "../interfaces/command"
import { bot } from "../index"
import { createEmbed } from "./helpers"

let top: Api|null = null

function timedPromise<T>(promise: Promise<T>, time: number) {
    return new Promise((resolve, reject) => {
        promise.then(resolve)
        promise.catch(reject)

        setTimeout(() => reject(`Promise took to long to settle > ${time}ms`), time)
    })
}

export function ensureVoter(id: string) {
    if(!top && process.env.TOPGG_AUTH_TOKEN) top = new Api(process.env.TOPGG_AUTH_TOKEN)

    return new Promise((resolve, reject) => {

        // if no top.gg token is set we warn about it and let the user proceed with the command
        // We also check if the top variable is set just to make the typechecker happy
        if(!process.env.TOPGG_AUTH_TOKEN || !top) {
            logger.context("top.gg vote locking gatekeeping is used but no top.gg token has been set", "utils/gatekeeping", "WARNING")
            return resolve(true)
        }

        const res = top.hasVoted(id)

        timedPromise(res, process.env.TOPGG_REQUEST_TIMEOUT ?? 2000)
            .then(resolve)
            .catch((err) => {
                logger.context(err, "utils/gatekeeping", "WARNING")
                return resolve(process.env.TOPGG_VOTE_LOCK_FAIL_BEHAVIOUR && process.env.TOPGG_VOTE_LOCK_FAIL_BEHAVIOUR == "accept")
            })
    })
}

export function checkGatekeeping(ctx: Message | CommandInteraction, command: BaseCommand|undefined ) {
    const isMessage = ctx instanceof Message
    const member = ctx.member
    const user = isMessage ? ctx.author : ctx.user
    const guild = ctx.guild

    return new Promise(async (resolve, reject) => {
        
        const e = createEmbed("Error", ctx, { colour: "Red" })

        if(!command) {
            resolve(false)
            e.setDescription("That command does not exist.")
            return ctx.reply({ embeds: [ e ], ephemeral: true })
        }

        // Make typechecker happy
        if(!member || !guild || !bot.user) {
            resolve(false)
            e.setDescription("This bot only works in servers")
            return ctx.reply({ embeds: [ e ], ephemeral: true })
        }

        // ensure user has voted for bot on top.gg
        if(command?.gatekeeping?.votelock && !await ensureVoter(user.id)) {
            resolve(false)
            e.setTitle("Voters Only")
            e.setColor("Orange")
            e.setDescription(`You need to vote for the bot on [top.gg](https://top.gg/bot/${ctx.client.user.id}/vote) before using this command`)
            return ctx.reply({ embeds: [ e ], ephemeral: true })
        }
    
        // Ensure user has enough perms
        if(command?.gatekeeping?.userPermissions && !guild.members.cache.get(user.id)?.permissions.has(command.gatekeeping.userPermissions)) {
            resolve(false)
            e.setDescription("you do not have the required permissions to run this command")
            return ctx.reply({ embeds: [ e ], ephemeral: true })
        }
    
        // Ensure bot has enough perms
        if(command?.gatekeeping?.botPermissions && guild.members.cache.get(bot.user.id)?.permissions.has(command.gatekeeping.botPermissions)) {
            resolve(false)
            e.setDescription(`I do not have enough permissions to run this command.\n**requires:** ${command.gatekeeping.botPermissions.toString()}`)
            return ctx.reply({ embeds: [ e ], ephemeral: true })
        }
    
        // Ensure only devs can run dev commands
        if(command?.gatekeeping?.ownerOnly && !process.env.DISCORD_BOT_OWNERS.includes(user.id)) {
            resolve(false)
            e.setDescription("Only developers can run this command")
            return ctx.reply({ embeds: [ e ], ephemeral: true })
        }

        resolve(true)
    })
}
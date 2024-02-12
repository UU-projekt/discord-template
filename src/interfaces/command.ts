import { ChatInputCommandInteraction, Message, PermissionResolvable, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js"
import { ContextType } from "../lib/logger/logger"

type GateKeepingOptions = {
    ownerOnly?: boolean,
    userPermissions?:   PermissionResolvable,
    botPermissions?:    PermissionResolvable,
    devServerOnly?:     boolean,
    votelock?:          boolean
}

export interface BaseCommand {
    gatekeeping?: GateKeepingOptions
}

export type CommandExecutionContext = {
    log: ( text: string, type?: ContextType ) => void
}

export interface Command extends BaseCommand {
    data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand"> | SlashCommandSubcommandsOnlyBuilder,
    run: (interaction: ChatInputCommandInteraction, ctx: CommandExecutionContext) => Promise<any>
}

type TextCommandContext = {
    args: string[],
    message: Message
}

export interface TextCommand extends BaseCommand {
    run: (interaction: TextCommandContext, ctx: CommandExecutionContext) => Promise<any>,
    name: string
}
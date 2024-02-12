import { ActionRowBuilder, ColorResolvable, CommandInteraction, EmbedBuilder, Message } from "discord.js";

type createEmbedOptions = {
    description?: string,
    fields?: { name: string, value: string }[],
    showAuthor?: boolean,
    components?: ActionRowBuilder<any>[],
    colour?: ColorResolvable
}

export function createEmbed(title: string, ctx: Message | CommandInteraction, options?: createEmbedOptions): EmbedBuilder {
    const isMessage = ctx instanceof Message

    const e = new EmbedBuilder()
    .setTitle(title)

    if(options?.showAuthor) e.setAuthor({ iconURL: ( isMessage ? ctx.author.displayAvatarURL() : ctx.user.displayAvatarURL() ), name: (isMessage ? ctx.author.username : ctx.user.username) })
    if(options?.fields) e.setFields(...options.fields)
    if(options?.description) e.setDescription(options.description)
    if(options?.colour) e.setColor(options.colour)

    return e
}
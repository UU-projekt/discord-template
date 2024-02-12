# Discord Bot Template (TypeScript/JS compatible)
> This is a discord bot template that does the "boring" work of a bot for you. </br>
> This bot comes with a command handler for both text command and slash commands with [gatekeeping](#gatekeeping) build in for you.

If you have any questions about this project you are welcome to join [my discord server](https://threadwatcher.xyz/devserver)
## Requirements
- [nodejs](https://nodejs.org/en) version 20 or higher
- [discord bot token](https://discord.com/developers/applications)
    <details>
        <summary>Get yours</summary>
        
        go to https://discord.com/developers/applications and log in if prompted.

        - Click "New Application" and enter a fitting name (can be changed later).
        - After that navigate to the bot tab on the left and create one.
        - navigate down to "Privileged Gateway Intents" and enable "server members intent" and "message content intent"
        - click "reset token" or "show token" and paste the token you get into the .env file 
    </details>
- [git](https://git-scm.com/downloads)

## Set Up
Set up an empty directory and open the console. After that run these commands in order

`git clone https://github.com/UU-projekt/discord-template.git .` - download the code

`npm i` - downloads all required packages

`npm run build` - turns all the typescript file into runnable javascript. This will have to be done any time you make changes to the bot

rename the example.env file to just ".env" and input the required data into it.

`npm run start` - will start the bot! Happy coding ;\)

### Registering commands
You can register any slash command you have created by running the built in `!register <local|global>` command directly via discord!

# Develop new commands
The easiest way to develop a new command is just to make a copy of the example.(ts/js) file that exist both in the slash command folder and the text command folder.

## gatekeeping (slash and text commands)
This template comes with a decent amount of gatekeeping logic already written for you! "Gatekeeping" is my way of saying *making sure only authorized users can run a command*. You only need to include the gatekeeping variables that you want to use!

**Gatekeeping variables:**
- ownerOnly: boolean -> if set to true only bot owners (specified in .env file) can run the command
- userPermissions: [PermissionResolvable](https://discord.js.org/docs/packages/discord.js/14.14.1/PermissionResolvable:TypeAlias) -> users need to have these permissions to run the command
- botPermissions: [PermissionResolvable](https://discord.js.org/docs/packages/discord.js/14.14.1/PermissionResolvable:TypeAlias) -> the bot needs these permissions to run the command
- devServerOnly: boolean -> this will make sure the command can only be ran on the dev server (specified in .env)
- \*votelock: boolean -> this will require the user to vote for the bot on top.gg before using the command (requires `TOPGG_AUTH_TOKEN` is set in .env file)

\* *to get a top.gg token your bot needs to be approved on top.gg. You can find out how to get the token [here](https://youtu.be/wqlU2KOxQws?feature=shared&t=33)*

# Discord Bot Template (TypeScript)
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
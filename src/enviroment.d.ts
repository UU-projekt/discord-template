declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DISCORD_AUTH_TOKEN: string;
        NODE_ENV: 'development' | 'production';
        DISCORD_BOT_STATUS: string;
        DISCORD_BOT_PREFIX: string,
        DISCORD_BOT_OWNERS: string|string[],
        
        TOPGG_AUTH_TOKEN?: string,
        TOPGG_AUTOPOST_STATS?: boolean,
        TOPGG_REQUEST_TIMEOUT?: number,
        TOPGG_VOTE_LOCK_FAIL_BEHAVIOUR?: "deny"|"accept"
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
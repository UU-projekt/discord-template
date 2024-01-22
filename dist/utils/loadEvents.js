"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const index_1 = require("../index");
function default_1(client, refresh = false) {
    index_1.logger.debug(`Loading events...`);
    (0, fs_1.readdirSync)("./dist/events").forEach(file => {
        if (file.endsWith(".js")) {
            const cmd = require(`../events/${file}`).default;
            const eventName = file.split(".")[0];
            index_1.logger.debug(`Loading event "${eventName}"`);
            if (refresh)
                client.removeListener(eventName, () => { });
            client.addListener(eventName, cmd);
        }
    });
}
exports.default = default_1;

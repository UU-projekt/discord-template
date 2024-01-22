"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const log75_1 = tslib_1.__importDefault(require("log75"));
const ansi_colors_1 = require("ansi-colors");
class Logger extends log75_1.default {
    formatedTime() {
        const pad = (txt) => txt.toString().length === 1 ? ("0" + txt) : txt;
        const d = new Date();
        return `at ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    log(text) {
        super.print(`${text}\n${ansi_colors_1.gray.bold(this.formatedTime())}`, "LOG", ansi_colors_1.blue, console.log);
    }
    warn(text) {
        super.print(`${text}\n${ansi_colors_1.gray.bold(this.formatedTime())}`, "WARN", ansi_colors_1.yellow, console.warn);
    }
    error(text) {
        super.print(`${text}\n${ansi_colors_1.gray.bold(this.formatedTime())}`, "ERROR", ansi_colors_1.red, console.error);
    }
    context(text, context) {
        super.print(`${text}\n${ansi_colors_1.gray.bold(`${this.formatedTime()} @ ${context}`)}`, "CMD", ansi_colors_1.green, console.error);
    }
}
exports.default = Logger;

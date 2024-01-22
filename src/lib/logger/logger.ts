import Log75 from "log75"
import { blue, gray, yellow, red, green } from "ansi-colors"

export default class Logger extends Log75 {

    private formatedTime(): string {

        const pad = (txt: string|number) => txt.toString().length === 1 ? ("0" + txt) : txt

        const d = new Date()

        return `at ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    }

    log(text: string) {
        super.print(`${text}\n${gray.bold(this.formatedTime())}`, "LOG", blue, console.log)
    }

    warn(text: string) {
        super.print(`${text}\n${gray.bold(this.formatedTime())}`, "WARN", yellow, console.warn)
    }

    error(text: string) {
        super.print(`${text}\n${gray.bold(this.formatedTime())}`, "ERROR", red, console.error)
    }

    context(text: string, context: string) {
        super.print(`${text}\n${gray.bold(`${this.formatedTime()} @ ${context}`)}`, "CMD", green, console.error)
    }
}
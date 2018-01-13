import { OutPutLike } from "./outputlike.js";

export class ConsoleOutput implements OutPutLike {
    format(format: string, parameterObject?: any): string {
        let result = format.toString();
        for (let index in parameterObject) {
            let rex;
            if (index.startsWith("$")) {
                rex = RegExp("\\{\\" + index + "\\}", "g");;
            } else {
                rex = RegExp("\\{" + index + "\\}", "g");;
            }
            result = result.replace(rex, parameterObject[index]);
        }
        return result;
    }
    clear(): void {
        console.clear();
    }
    write(title: string, message: string, passed: boolean): void {
       console.log(`(passed) ${title}: ${message}`);
    }
}
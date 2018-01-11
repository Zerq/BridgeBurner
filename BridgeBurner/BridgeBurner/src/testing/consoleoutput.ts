import { OutPutLike } from "./outputlike";

export class ConsoleOutput implements OutPutLike {
    write(message: string): void {
        console.log(message);
    }
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

}
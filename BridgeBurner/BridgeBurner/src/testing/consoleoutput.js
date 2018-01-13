export class ConsoleOutput {
    format(format, parameterObject) {
        let result = format.toString();
        for (let index in parameterObject) {
            let rex;
            if (index.startsWith("$")) {
                rex = RegExp("\\{\\" + index + "\\}", "g");
                ;
            }
            else {
                rex = RegExp("\\{" + index + "\\}", "g");
                ;
            }
            result = result.replace(rex, parameterObject[index]);
        }
        return result;
    }
    clear() {
        console.clear();
    }
    write(title, message, passed) {
        console.log(`(passed) ${title}: ${message}`);
    }
}
//# sourceMappingURL=consoleoutput.js.map
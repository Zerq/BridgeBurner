export class State {
    static async Ready(callback) {
        return new Promise((resolve, reject) => {
            if (document.readyState == "complete") {
                if (callback) {
                    callback();
                }
                resolve();
            }
            else if (document.readyState) {
                document.addEventListener("readystatechange", n => {
                    if (document.readyState == "complete") {
                        if (callback) {
                            callback();
                        }
                        resolve();
                    }
                });
            }
        });
    }
}
//# sourceMappingURL=state.js.map
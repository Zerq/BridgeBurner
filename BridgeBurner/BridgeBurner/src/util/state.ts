export class State {
    public static async Ready(callback?: () => void): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (document.readyState == "complete") {
                if (callback) {
                    callback();
                }
                resolve();
            }
            else
            if (document.readyState) {
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

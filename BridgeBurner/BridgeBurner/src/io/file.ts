export class File {
    public static async RequestAsync(url: string, timeout: number = 2000): Promise<XMLHttpRequest> {
        var p: Promise<XMLHttpRequest> = new Promise((resolve, reject) => {
            var args = Array.prototype.slice.call(arguments, 3);
            var xhr = new XMLHttpRequest();
            xhr.ontimeout = function () {
                reject("The request for " + url + " timed out.");
            };
            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr);
                        // callback.apply(xhr, args);
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.timeout = timeout;
            xhr.send(null);
        });

        return await p;
    }
}
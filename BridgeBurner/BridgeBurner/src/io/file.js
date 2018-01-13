export class File {
    static async RequestAsync(url, timeout = 2000) {
        var p = new Promise((resolve, reject) => {
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
                    }
                    else {
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
//# sourceMappingURL=file.js.map
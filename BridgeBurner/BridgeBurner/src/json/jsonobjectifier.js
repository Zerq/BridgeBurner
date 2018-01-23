import { JsonNetDecycle } from "./jsonnetdecycler.js";
export class JsonObjectifier {
    static objectify(jsonString) {
        return JsonNetDecycle.retrocycle(JsonObjectifier.fixDate(JSON.parse(jsonString)));
    }
    static deObjectify(obj) {
        return JSON.stringify(JsonObjectifier.unFixDate(JsonNetDecycle.decycle(obj)));
    }
    static fixDate(obj) {
        for (let i1 in obj) {
            if (typeof (obj[i1]) === "string") {
                if (obj[i1].startsWith("$$DateTime=")) {
                    obj[i1] = new Date(obj[i1].replace("|DateTime|", ""));
                }
            }
            else if (Object.prototype.toString.call(obj[i1]) === "[object array]") {
                for (let i2 = 0; i2 < obj[i1].length; i2++) {
                    obj[i1][i2] = JsonObjectifier.fixDate(obj[i1][i2]);
                }
            }
            else if (typeof (obj[i1]) === 'object') {
                obj[i1] = JsonObjectifier.fixDate(obj[i1]);
            }
        }
        return obj;
    }
    static unFixDate(obj) {
        for (let i1 in obj) {
            if (Object.prototype.toString.call(obj[i1]) === "[object Date]") {
                obj[i1] = "$$DateTime=" + new Date().toISOString().slice(0, 19);
            }
            else if (Object.prototype.toString.call(obj[i1]) === "[object array]") {
                for (let i2 = 0; i2 < obj[i1].length; i2++) {
                    obj[i1][i2] = JsonObjectifier.unFixDate(obj[i1][i2]);
                }
            }
            else if (typeof (obj[i1]) === 'object') {
                obj[i1] = JsonObjectifier.unFixDate(obj[i1]);
            }
        }
        return obj;
    }
}
//# sourceMappingURL=jsonobjectifier.js.map
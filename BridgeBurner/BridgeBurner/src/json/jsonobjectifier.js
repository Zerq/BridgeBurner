import { JsonNetDecycle } from "./jsonnetdecycler.js";
export class JsonObjectifier {
    static objectify(jsonString) {
        return JsonNetDecycle.retrocycle(JsonObjectifier.fixDate(JSON.parse(jsonString)));
    }
    static deObjectify(obj) {
        return JSON.stringify(JsonObjectifier.unFixDate(JsonNetDecycle.decycle(obj)));
    }
    static objectify2(jsonString) {
        return JsonNetDecycle.retrocycle(JSON.parse(jsonString, JsonObjectifier.reviveDate));
    }
    static deObjectify2(obj) {
        return JSON.stringify((JsonNetDecycle.decycle(obj), JsonObjectifier.replaceDate));
    }
    static reviveDate(key, value) {
        if (typeof (value) === "string" && JsonObjectifier.dateRegex.test(value)) {
            value = new Date(value);
        }
        return value;
    }
    static replaceDate(key, value) {
        if (Object.prototype.toString.call(value) === "[object Date]") {
            return value.toISOString().slice(0, 19);
        }
        return value;
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
                obj[i1] = "$$DateTime=" + obj[i1].toISOString().slice(0, 19);
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
JsonObjectifier.dateRegex = /\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}/g;
//# sourceMappingURL=jsonobjectifier.js.map
import { JsonNetDecycle } from "./jsonnetdecycler.js";
export class JsonObjectifier {
   public static objectify<T>(jsonString: string): T {
        return <T>JsonNetDecycle.retrocycle(JsonObjectifier.fixDate(JSON.parse(jsonString)));   
    }
   public static deObjectify<T>(obj: T): string {
       return JSON.stringify(JsonObjectifier.unFixDate(JsonNetDecycle.decycle(obj)));
   }
    public static fixDate(obj: any): any{
        for (let i1 in obj) {
            if (typeof(obj[i1]) === "string") {
                if ((<string>obj[i1]).startsWith("$$DateTime=")) {
                    obj[i1] = new Date((<string>obj[i1]).replace("|DateTime|", ""));
                }
            }else if (Object.prototype.toString.call(obj[i1]) === "[object array]") {
                for (let i2 = 0; i2 < obj[i1].length; i2++) {
                    obj[i1][i2] =  JsonObjectifier.fixDate(obj[i1][i2]);
                }
            } else if (typeof (obj[i1]) === 'object') {
                obj[i1]= JsonObjectifier.fixDate(obj[i1]);
            }

    
        }
        return obj;
   }
    public static unFixDate(obj: any): any {
        for (let i1 in obj) {
            if (Object.prototype.toString.call(obj[i1]) === "[object Date]") {
                obj[i1] = "$$DateTime=" + new Date().toISOString().slice(0, 19);                
            }else if (Object.prototype.toString.call(obj[i1]) === "[object array]") {
                for (let i2 = 0; i2 < obj[i1].length; i2++) {
                    obj[i1][i2] = JsonObjectifier.unFixDate(obj[i1][i2]);
                }
            } else if (typeof (obj[i1]) === 'object') {
                obj[i1] = JsonObjectifier.unFixDate(obj[i1]);
            }

            
        }
        return obj;
    }
 
}
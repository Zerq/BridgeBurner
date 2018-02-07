import { JsonNetDecycle } from "./jsonnetdecycler.js";





export class JsonObjectifier {
   public static objectify<T>(jsonString: string): T {
        return <T>JsonNetDecycle.retrocycle(JsonObjectifier.fixDate(JSON.parse(jsonString)));   
    }
   public static deObjectify<T>(obj: T): string {
       return JSON.stringify(JsonObjectifier.unFixDate(JsonNetDecycle.decycle(obj)));
   }


   public static objectify2<T>(jsonString: string): T {
       return <T>JsonNetDecycle.retrocycle(JSON.parse(jsonString, JsonObjectifier.reviveDate));
   }
   public static deObjectify2<T>(obj: T): string {
       return JSON.stringify((JsonNetDecycle.decycle(obj), JsonObjectifier.replaceDate));
   }


   private static dateRegex = /\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}:\d{2}/g

   public static reviveDate(key: any, value: any) {
       if (typeof (value) === "string" && JsonObjectifier.dateRegex.test(value)) {
           value = new Date(value);
       }
       return value;
   }
   public static replaceDate(key: any, value: any) {
       if (Object.prototype.toString.call(value) === "[object Date]") {
           return  value.toISOString().slice(0, 19); 
       }
       return value;
   }

    public static fixDate(obj: any): any{
        for (let i1 in obj) {
            if (typeof (obj[i1]) === 'object') {
                if (obj[i1].$Type && obj[i1].$Type == "DateTime") {
                    obj[i1] = new Date(obj[i1].$Value);
                }
                else {
                    obj[i1] = JsonObjectifier.fixDate(obj[i1]);
                }
            }    
        }
        return obj;
   }
    public static unFixDate(obj: any): any {
        for (let i1 in obj) {
            if (Object.prototype.toString.call(obj[i1]) === "[object Date]") {
                obj[i1] = {
                    $Type: "DateTime",
                    $Value: obj[i1].toString()
                };
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
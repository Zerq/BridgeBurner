import { JsonObjectifier } from "./json/jsonobjectifier.js";
import { ViewEngine } from "./view/viewEngine.js"; 
import { File } from "./io/file.js";
import { State } from "./util/state.js";
import { ES6UnitTestBase } from "./testing/es6unittestbase.js";
import { Test } from "./testing/test.js";
import { MarkupOutput } from "./testing/markupoutput.js";

interface y {
    Time: Date;
    Name: String;
    Parent: x;
}
interface x {
    xxxx: Array<y>,
    Time: Date;
    Name: String;
}

class FileTest extends ES6UnitTestBase {



    @Test()
    public async jsonTestStandard() {
                           
        let test: string = '[{"$id":"1","xxxx":[{"$id":"2","Time":{"$Type":"DateTime","$Value":"Wed Jan 01 2018 22:14:41 GMT+01:00"},"Name":"zog","Parent":{"$ref":"1"}}],"Name":"burklax","Time":{"$Type":"DateTime","$Value":"Wed Jan 01 2018 22:14:41 GMT+01:00"}}]';
        let result: Array<x> = JsonObjectifier.objectify<Array<x>>(test);
        this.assert.areEqual("Json test Name property", "burklax", result[0].Name);
        let a = new Date(2018, 0, 23, 0, 0, 0).toDateString();
        let b = result[0].xxxx[0].Time.toDateString();
        this.assert.areEqual("Json time on child", a, b);
      
        let result2 = JsonObjectifier.deObjectify(result);
    
    } 


    @Test()
    public async canLoadFile() {
        let request = await File.RequestAsync("filetest.txt");
        this.assert.areEqual("File test", request.responseText, "burklax");
    }

    @Test()
    public async loadInlineView() {

        await this.assert.tryExpressionAsync("try load inline view",async () => {
            let item = await ViewEngine.loadTemplate("test1");
            if (!item) {
                throw Error("inline template not found");
            }
            let root = document.createElement("RootNode");
            root.innerHTML = item;
            ViewEngine.parse(root, { items: [{ name: "spog" }, { name: "wörbl" }, {name:"Yarplharg"}]});
        });
    }

    @Test()
    public async loadView() {

        await this.assert.tryExpressionAsync("try load  view", async () => {
            let item = await ViewEngine.loadTemplate("./fileTest.html");
            if (!item) {
                throw Error("template not found");
            }      
        });
    }
}


export class App {
    public static async Run() {
        await State.Ready();
        let test = new FileTest()
        test.output = await MarkupOutput.getInstance("filetest");
        test.runAll();
    }
}
//App.Run();

export class StyleTricks {

    

private static LongestStringLenght<T>(array: Array<T>, getter: (n: any) => any): number {
    if (array.length) {
        let result = array.sort((a: T, b: T) => {
            let aa = getter(a).toString().length;
            let bb = getter(b).toString().length;
            if (aa < bb) {
                return 1;
            } else if (bb < aa) {
                return -1;
            } else if (aa === bb) {
                return 0;
            } else {
                throw new Error("sorting error"); // this should not be reachable.... i would hope...
            }
        });
        return getter(result[0]).toString().length;
    } else {
        return 0;
    }
}

public static setToMaxWidth(className: string, element: HTMLElement) {  
        let targets = <Array<HTMLElement>>Array.prototype.slice.call(element.getElementsByClassName(className), 0)
        let max = 0;
        targets
            .map(n => n.getBoundingClientRect ?
                n.getBoundingClientRect().width > max ?
                    max = n.getBoundingClientRect().width : undefined
                : undefined);
        targets.map(n => n.style.width = max + "px");
    }
}
let list = [{ zog: 5, hark: "fds gdfgdg" }, { zog: 2, hark: "fderter gdg" }, { zog: 6, hark: "fdsge rete te ert dfgdg" }];
 

var fdiv = document.getElementById("filetest");
if (fdiv) {
    let index2 = 0;
    for (let index in list) {
        let div: HTMLDivElement = document.createElement("div");
        div.style.display = "inline-block";
        let xd = "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ",255)";
        div.style.backgroundColor = xd;  
        div.className = "spog";
        div.innerText = list[index].hark;
        fdiv.appendChild(div);
        let zog = div.getBoundingClientRect();
        let xcv = 5555;
    }   
    StyleTricks.setToMaxWidth("spog", fdiv);
} 





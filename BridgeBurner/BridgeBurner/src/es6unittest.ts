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



function LongestStringLenght<T>(array: Array<T>, getter: (n: any) => any): number {
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
let list = [{ zog: 5, hark: "fds gdfgdg" }, { zog: 2, hark: "fderter gdg" }, { zog: 6, hark: "fdsge rete te ert dfgdg" }];
let x = LongestStringLenght(list, n => n.hark);

var fdiv = document.getElementById("filetest");
if (fdiv) {

    let index2 = 0;
    for (let index in list) {
        let div: HTMLDivElement = document.createElement("div");
        div.innerText = list[index].hark;
        fdiv.appendChild(div);
        let zog = div.getBoundingClientRect();
        let xcv = 5555;
    }

    let xdd =  fdiv.getElementsByTagName("div");
    let max = 0; 

    for (let index in xdd) {
        let item: HTMLDivElement = xdd[index];
        if (item.getBoundingClientRect) {
            let xfg = item.getBoundingClientRect().width;
            if (Object.toString.call(item) === Object.toString.call(HTMLDivElement)) {

            }
            if (xfg > max) {
                max = xfg;
            }
        }
    }
 
    for (let index in xdd) {
        let item: HTMLDivElement = xdd[index];
        if (item.getBoundingClientRect) {
           // item.style.backgroundColor = "cyan";
            item.style.width = max + "px";
            item.style.display = "inline";
            let xd = "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ",255)";
            item.style.backgroundColor = xd;  
            let x = 5;
        }
    }
}
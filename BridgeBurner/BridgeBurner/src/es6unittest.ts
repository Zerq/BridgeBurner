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

        let test: string = '[{ "$id": "1", "xxxx": [{ "$id": "2", "Time": "2018-01-23 00:00:00", "Name": "zog", "Parent": { "$ref": "1" } }], "Name": "burklax", "Time": "1982-08-08 00:00:00" }]';
        let result: Array<x> = JsonObjectifier.objectify2<Array<x>>(test);
        this.assert.areEqual("Json test Name property", "burklax", result[0].Name);
        let a = new Date(2018, 0, 23, 0, 0, 0).toDateString();
        let b = result[0].xxxx[0].Time.toDateString();
        this.assert.areEqual("Json time on child", a, b);

        let result2 = JsonObjectifier.deObjectify2(result);

    }


    @Test()
    public async jsonTest() {

        let test: string = '[{ "$id": "1", "xxxx": [{ "$id": "2", "Time": "$$DateTime=2018-01-23 00:00:00", "Name": "zog", "Parent": { "$ref": "1" } }], "Name": "burklax", "Time": "$$DateTime=1982-08-08 00:00:00" }]';
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
App.Run();

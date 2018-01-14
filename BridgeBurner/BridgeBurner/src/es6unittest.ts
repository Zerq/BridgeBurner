import { ViewEngine } from "./view/viewEngine.js";
import { StyleConstructor } from "./util/styleconstructor.js";
import { File } from "./io/file.js";
import { State } from "./util/state.js";
import { ES6UnitTestBase } from "./testing/es6unittestbase.js";
import { Test } from "./testing/test.js";
import { MarkupOutput } from "./testing/markupoutput.js";

class FileTest extends ES6UnitTestBase {
    @Test()
    public async canLoadFile() {
        let request = await File.RequestAsync("filetest.txt");
        this.assert.areEqual("File test", request.responseText, "burklax");
    }

    @Test()
    public async loadInlineView() {
        StyleConstructor.test();
        await this.assert.tryExpressionAsync("try load inline view",async () => {
            let item = await ViewEngine.loadTemplate("test1");
            if (!item) {
                throw Error("inline template not found");
            }
        });
    }

    @Test()
    public async loadView() {
        StyleConstructor.test();
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
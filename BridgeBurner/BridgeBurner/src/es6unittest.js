var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { JsonObjectifier } from "./json/jsonobjectifier.js";
import { ViewEngine } from "./view/viewEngine.js";
import { File } from "./io/file.js";
import { State } from "./util/state.js";
import { ES6UnitTestBase } from "./testing/es6unittestbase.js";
import { Test } from "./testing/test.js";
import { MarkupOutput } from "./testing/markupoutput.js";
class FileTest extends ES6UnitTestBase {
    async jsonTest() {
        let test = '[{ "$id": "1", "xxxx": [{ "$id": "2", "Time": "$$DateTime=2018-01-23 00:00:00", "Name": "zog", "Parent": { "$ref": "1" } }], "Name": "burklax", "Time": "$$DateTime=1982-08-08 00:00:00" }]';
        let result = JsonObjectifier.objectify(test);
        this.assert.areEqual("Json test Name property", "burklax", result[0].Name);
        let a = new Date(2018, 0, 23, 0, 0, 0).toDateString();
        let b = result[0].xxxx[0].Time.toDateString();
        this.assert.areEqual("Json time on child", a, b);
        let result2 = JsonObjectifier.deObjectify(result);
    }
    async canLoadFile() {
        let request = await File.RequestAsync("filetest.txt");
        this.assert.areEqual("File test", request.responseText, "burklax");
    }
    async loadInlineView() {
        await this.assert.tryExpressionAsync("try load inline view", async () => {
            let item = await ViewEngine.loadTemplate("test1");
            if (!item) {
                throw Error("inline template not found");
            }
            let root = document.createElement("RootNode");
            root.innerHTML = item;
            ViewEngine.parse(root, { items: [{ name: "spog" }, { name: "wörbl" }, { name: "Yarplharg" }] });
        });
    }
    async loadView() {
        await this.assert.tryExpressionAsync("try load  view", async () => {
            let item = await ViewEngine.loadTemplate("./fileTest.html");
            if (!item) {
                throw Error("template not found");
            }
        });
    }
}
__decorate([
    Test(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileTest.prototype, "jsonTest", null);
__decorate([
    Test(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileTest.prototype, "canLoadFile", null);
__decorate([
    Test(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileTest.prototype, "loadInlineView", null);
__decorate([
    Test(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileTest.prototype, "loadView", null);
export class App {
    static async Run() {
        await State.Ready();
        let test = new FileTest();
        test.output = await MarkupOutput.getInstance("filetest");
        test.runAll();
    }
}
App.Run();
//# sourceMappingURL=es6unittest.js.map
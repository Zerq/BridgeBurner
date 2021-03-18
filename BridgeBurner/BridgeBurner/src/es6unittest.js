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
    async jsonTestStandard() {
        let test = '[{"$id":"1","xxxx":[{"$id":"2","Time":{"$Type":"DateTime","$Value":"Wed Jan 01 2018 22:14:41 GMT+01:00"},"Name":"zog","Parent":{"$ref":"1"}}],"Name":"burklax","Time":{"$Type":"DateTime","$Value":"Wed Jan 01 2018 22:14:41 GMT+01:00"}}]';
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
], FileTest.prototype, "jsonTestStandard", null);
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
//App.Run();
export class StyleTricks {
    static LongestStringLenght(array, getter) {
        if (array.length) {
            let result = array.sort((a, b) => {
                let aa = getter(a).toString().length;
                let bb = getter(b).toString().length;
                if (aa < bb) {
                    return 1;
                }
                else if (bb < aa) {
                    return -1;
                }
                else if (aa === bb) {
                    return 0;
                }
                else {
                    throw new Error("sorting error"); // this should not be reachable.... i would hope...
                }
            });
            return getter(result[0]).toString().length;
        }
        else {
            return 0;
        }
    }
    static setToMaxWidth(className, element) {
        let targets = Array.prototype.slice.call(element.getElementsByClassName(className), 0);
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
        let div = document.createElement("div");
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
//# sourceMappingURL=es6unittest.js.map
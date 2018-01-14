import { File } from '../io/file.js';
export class ViewEngine {
    static async loadTemplate(path) {
        var template = document.getElementById(path);
        if (template) {
            if (template.tagName === "TEMPLATE") {
                return template.innerHTML;
            }
        }
        var request = await File.RequestAsync(path, 300);
        return request.responseText;
    }
    static repeater(item) {
    }
    static repeaterLogic(item) {
        alert("burklax_" + item.innerText);
    }
    static parse(item) {
        let handlerItem = ViewEngine.components[item.tagName];
        if (handlerItem) {
            handlerItem(item);
        }
        else {
            for (let i = 0; i < item.children.length; i++) {
                ViewEngine.parse(item.children[i]);
            }
        }
    }
    static async x(path) {
        let doc = document.createElement("RootNode");
        doc.innerHTML = await ViewEngine.loadTemplate(path);
        ViewEngine.parse(doc);
    }
}
ViewEngine.components = {
    OMNIREPEATER: ViewEngine.repeaterLogic
};
//# sourceMappingURL=viewEngine.js.map
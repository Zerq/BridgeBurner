import { PathUtil } from "../util/pathutil.js";
import { File } from "../io/file.js";
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
    static repeaterLogic(item, model) {
        let attr = item.getAttribute("forEach");
        if (attr) {
            let split = attr.split(" in ");
            if (split.length == 2) {
                let list = PathUtil.findOrReplace(split[1], model);
                list.forEach(n => {
                    for (let i = 0; i < item.children.length; i++) {
                        ViewEngine.parse(item.children[i], n);
                    }
                });
            }
            alert("burklax_" + item.innerText);
            item.children;
        }
    }
    static parse(template, model) {
        let handlerItem = ViewEngine.components[template.tagName];
        if (handlerItem) {
            handlerItem(template);
        }
        else {
            for (let i = 0; i < template.children.length; i++) {
                ViewEngine.parse(template.children[i], model);
            }
        }
    }
}
ViewEngine.components = {
    OMNIREPEATER: ViewEngine.repeaterLogic
};
//# sourceMappingURL=viewEngine.js.map
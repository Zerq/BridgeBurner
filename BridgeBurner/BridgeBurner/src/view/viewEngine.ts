import { PathUtil } from "../util/pathutil.js";
import { File } from "../io/file.js";
import { Lexer } from "../lib/typed-lexer/dist/typed-lexer";
 

export class ViewEngine {
    public static async loadTemplate(path: string): Promise<string> {
        var template = document.getElementById(path);
        if (template) {
            if (template.tagName === "TEMPLATE") {
                return template.innerHTML;
            }
        }    
            var request = await File.RequestAsync(path, 300);
            return request.responseText;
    }

    
    private static components: any = {
        OMNIREPEATER: ViewEngine.repeaterLogic
    };

 
    private static repeaterLogic(item: HTMLElement, model: any) {
        let attr = item.getAttribute("forEach");
        if (attr) {
            let split = attr.split(" in ");
            if (split.length == 2) {
                let list: Array<any> = PathUtil.findOrReplace(split[1], model);
                list.forEach(n => {
                    for (let i = 0; i < item.children.length; i++) {
                        ViewEngine.parse(<HTMLElement>item.children[i], n);
                    }

                });
            }
            alert("burklax_" + item.innerText);
            item.children
        }


    }

    public static parse(template: HTMLElement, model:any): void {
        let handlerItem = ViewEngine.components[template.tagName];
        if (handlerItem) {
            handlerItem(template);
        } else {
            for (let i = 0; i < template.children.length; i++) {
                ViewEngine.parse(<HTMLElement>template.children[i], model);
            }
        }
    }
 
}

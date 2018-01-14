import { File } from '../io/file.js';
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
}

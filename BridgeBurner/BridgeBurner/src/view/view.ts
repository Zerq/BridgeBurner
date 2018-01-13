import { File } from '../io/file.js';
export class ViewEngine {
    public static async loadTemplate(path: string) {
        var request = await File.RequestAsync(path, 300);        
           let x: HTMLElement = document.createElement("OmniTemplate");
           x.innerHTML = request.response;
    }
}

import { File } from '../io/file.js';
export class ViewEngine {
    static async loadTemplate(path) {
        var request = await File.RequestAsync(path, 300);
        let x = document.createElement("OmniTemplate");
        x.innerHTML = request.response;
    }
}
//# sourceMappingURL=view.js.map
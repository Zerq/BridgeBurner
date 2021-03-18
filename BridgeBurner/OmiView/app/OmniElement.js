export class OmniElement extends HTMLElement {
    constructor() {
        super();
    }
    get ParentView() {
        const view = this.tunnelOneStepForParentView(this.parentElement);
        if (view !== null && view !== undefined) {
            return {};
        }
        else {
            throw new Error(`Orphaned Tag "${this.tagName}"`);
        }
    }
    tunnelOneStepForParentView(element) {
        if (element === undefined || element === undefined) {
            return null;
        }
        if (element.tagName === "view") {
            return element;
        }
        else {
            return this.tunnelOneStepForParentView(element.parentElement);
        }
    }
}

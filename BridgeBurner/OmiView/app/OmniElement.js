export class OmniElement extends HTMLElement {
    constructor() {
        super();
    }
    get ParentView() {
        if (this && this.tagName.toLocaleLowerCase() === "o-view") {
            return this;
        }
        if (this && this.parentElement?.tagName.toLocaleLowerCase() === "o-view") {
            return this.parentElement;
        }
        const shadowHost = this.parentElement?.parentNode?.host;
        if (shadowHost.tagName.toLocaleLowerCase() === "o-view") {
            return shadowHost;
        }
        else {
            throw new Error(`Orphaned Tag "${this.tagName} is this ieven possible?"`);
        }
    }
    tunnelOneStepForParentView(element) {
        if (element === null || element === undefined) {
            return null;
        }
        if (element.tagName.toLocaleLowerCase() === "o-view") {
            return element;
        }
        else {
            return this.tunnelOneStepForParentView(element.parentElement);
        }
    }
}

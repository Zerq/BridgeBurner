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
        const result = this.tunnelOneStepForParentView(this);
        if (result !== undefined && result !== null) {
            return result;
        }
        return null;
    }
    tunnelOneStepForParentView(element) {
        if (element === null || element === undefined) {
            return null;
        }
        if (element.tagName.toLocaleLowerCase() === "o-view") {
            return element;
        }
        else {
            if (!element.parentElement) {
                const shadowHost = element.parentNode?.host;
                if (shadowHost.tagName.toLocaleLowerCase() === "o-view") {
                    return shadowHost;
                }
                else {
                    throw new Error(`Orphaned Tag "${this.tagName} is this ieven possible?"`);
                }
            }
            else {
                return this.tunnelOneStepForParentView(element.parentElement);
            }
        }
    }
}

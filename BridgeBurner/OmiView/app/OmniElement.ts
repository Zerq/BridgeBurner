import { OmniView } from "./Omniview";

export class OmniElement extends HTMLElement {
    constructor() {
        super();
    }

    public get ParentView(): OmniView {

        const view = this.tunnelOneStepForParentView(this.parentElement);
        if (view !== null && view !== undefined) {
            return {} as OmniView;
        }
        else {
            throw new Error(`Orphaned Tag "${this.tagName}"`);
        }
    }

    private  tunnelOneStepForParentView(element: HTMLElement | null | undefined): OmniView | null | undefined {

        if (element === undefined || element === undefined) {
            return null;
        }

        if ((element as OmniView).tagName === "view") {
            return element as OmniView;
        }
        else {
            return this.tunnelOneStepForParentView((element as OmniView).parentElement);
        }
    }
}

import { OmniView } from "./Omniview.js";

export class OmniElement extends HTMLElement {
    constructor() {
        super();
    }

    public get ParentView(): OmniView {

        if (this && this.tagName.toLocaleLowerCase() === "o-view")
        {
            return (this as unknown) as OmniView;
        }

        if (this && this.parentElement?.tagName.toLocaleLowerCase() === "o-view") {
            return (this.parentElement as unknown) as OmniView;
        }

        const shadowHost = (this.parentElement?.parentNode as ShadowRoot)?.host;

        if (shadowHost.tagName.toLocaleLowerCase() === "o-view") {
            return shadowHost as OmniView;

        } else {
            throw new Error(`Orphaned Tag "${this.tagName} is this ieven possible?"`);
        }


    }

    private  tunnelOneStepForParentView(element: HTMLElement | null | undefined): OmniView | null | undefined {

        if (element === null || element === undefined) {
            return null;
        }

        if ((element as OmniView).tagName.toLocaleLowerCase() === "o-view") {
            return element as OmniView;
        }
        else {
            return this.tunnelOneStepForParentView((element as OmniView).parentElement);
        }
    }
}

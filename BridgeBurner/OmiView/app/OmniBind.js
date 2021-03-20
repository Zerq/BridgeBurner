import { OmniDataBoundElement } from "./OmniDataBoundElement.js";
/* eslint-disable  @typescript-eslint/no-explicit-any */ //I totlly ment to do that!
export class OmniBind extends OmniDataBoundElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ "mode": "open" });
        this.wrapper = document.createElement('span');
        this.span = this.shadowRoot?.querySelector("span");
        if (this.span === undefined || this.span === null) {
            this.span = document.createElement("span");
        }
        this.span.className = "Omni-bind";
        this.shadowRoot?.append(this.span);
    }
    Bind() {
        this.span.innerText = this.GetData();
    }
}

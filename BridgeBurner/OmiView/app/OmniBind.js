import { OmniDataBoundElement } from "./OmniDataBoundElement.js";
/* eslint-disable  @typescript-eslint/no-explicit-any */ //I totlly ment to do that!
export class OmniBind extends OmniDataBoundElement {
    constructor() {
        super();
        this.template = (content) => `<span class="OmniBind" >${content}</span>`;
        this.shadow = this.attachShadow({ "mode": "open" });
        this.wrapper = document.createElement('span');
        this.shadow.innerHTML = this.template(this.innerHTML);
        this.wrapper = this.shadowRoot?.querySelector("span");
    }
    Bind() {
        this.wrapper.innerText = this.GetData();
    }
}

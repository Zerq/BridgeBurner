import { OmniDataBoundElement } from "./OmniDataBoundElement.js";
/* eslint-disable  @typescript-eslint/no-explicit-any */ //I totlly ment to do that!
export class OmniBind extends OmniDataBoundElement {
    private template = (content: string) => `<span class="OmniBind" >${content}</span>`;
    private wrapper: HTMLSpanElement;
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ "mode": "open" });
        this.wrapper = document.createElement('span') as HTMLSpanElement;
        this.shadow.innerHTML = this.template(this.innerHTML);
        this.wrapper = this.shadowRoot?.querySelector("span") as HTMLSpanElement;
    }

    Bind(): void {
        this.wrapper.innerText = this.GetData();
    }
}

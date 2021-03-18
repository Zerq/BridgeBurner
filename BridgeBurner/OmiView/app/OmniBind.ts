import { OmniElement } from "./OmniElement.js";

export class Omnibind extends OmniElement {
    private shadow: ShadowRoot;
    private wrapper: HTMLSpanElement;


    constructor() {
        super();
        this.shadow = this.attachShadow({ "mode": "open" });
        this.wrapper = document.createElement('span');
    }
}
window.customElements.define('bind', Omnibind);

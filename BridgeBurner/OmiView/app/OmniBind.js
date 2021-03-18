import { OmniElement } from "./OmniElement.js";
export class Omnibind extends OmniElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ "mode": "open" });
        this.wrapper = document.createElement('span');
    }
}
window.customElements.define('bind', Omnibind);

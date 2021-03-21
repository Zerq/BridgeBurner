import { OmniDataBoundElement } from "./OmniDataBoundElement.js";
export class OmniView extends HTMLElement {
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    constructor() {
        super();
        this.template = (content) => `<div class="OmniView">${content}</div>`;
        this.shadow = this.attachShadow({ "mode": "open" });
        this.shadow.innerHTML = this.template(this.innerHTML);
        this.wrapper = this.shadowRoot?.querySelector("div");
    }
    get model() {
        return this._model;
    }
    set model(value) {
        this._model = value;
        this.attributeChangedCallback("model", this.model, value);
    }
    static get observedAttributes() { return ['model']; }
    attributeChangedCallback(name, oldValue, newValue) {
        const nodes = this.shadow.host.querySelectorAll("*");
        nodes.forEach(n => {
            if (n instanceof (OmniDataBoundElement)) {
                // this.wrapper.appendChild(n);
                n.Bind();
            }
            else {
                //this.wrapper.appendChild(n);
            }
        });
    }
}

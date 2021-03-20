import { OmniDataBoundElement } from "./OmniDataBoundElement.js";
export class OmniView extends HTMLElement {
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    constructor() {
        super();
        this.shadow = this.attachShadow({ "mode": "open" });
        this.wrapper = document.createElement('div');
        this.wrapper.className = "Omni-view";
        this.shadow.appendChild(this.wrapper);
        this.appendChild(this.wrapper);
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
                this.wrapper.appendChild(n);
                n.Bind();
            }
            else {
                this.wrapper.appendChild(n);
            }
        });
    }
}

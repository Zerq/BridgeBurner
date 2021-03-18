export class OmniView extends HTMLElement {
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    constructor() {
        super();
        this.shadow = this.attachShadow({ "mode": "open" });
        this.wrapper = document.createElement('div');
    }
    get model() {
        return this._model;
    }
    set Model(value) {
        this._model = value;
    }
}
window.customElements.define('view', OmniView);

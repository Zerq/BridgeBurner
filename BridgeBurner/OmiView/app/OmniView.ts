export class OmniView extends HTMLElement  {
    private shadow: ShadowRoot;
    private wrapper: HTMLDivElement;

    /* eslint-disable  @typescript-eslint/no-explicit-any */ //I totlly ment to do that!
    private _model!: any;

    public get model(): any {
        return this._model;
    }
    public set Model(value: any) {
        this._model = value;
    }
    /* eslint-enable  @typescript-eslint/no-explicit-any */

    constructor() {
        super();
        this.shadow = this.attachShadow({ "mode": "open" });
        this.wrapper = document.createElement('div');
    }

}
window.customElements.define('view', OmniView);
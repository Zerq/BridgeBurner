import { OmniDataBoundElement } from "./OmniDataBoundElement.js";
import { OmniElement } from "./OmniElement.js";
 
export class OmniView extends HTMLElement  {

    private template = (content: string) => `<div class="OmniView">${content}</div>`;


    private shadow: ShadowRoot;
    private wrapper: HTMLDivElement;

    /* eslint-disable  @typescript-eslint/no-explicit-any */ //I totlly ment to do that!
    private _model!: any;
    public get model(): any {
        return this._model;
    }
    public set model(value: any) {
        this._model = value;
        this.attributeChangedCallback("model", this.model, value);
    }
    static get observedAttributes() { return ['model']; }
 
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    constructor() {
        super();
        this.shadow = this.attachShadow({ "mode": "open" });
        this.shadow.innerHTML = this.template(this.innerHTML);
        this.wrapper = this.shadowRoot?.querySelector("div") as HTMLDivElement;
    }    
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
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

import { OmniElement } from "./OmniElement.js";
/* eslint-disable  @typescript-eslint/no-explicit-any */ //I totlly ment to do that!
export class OmniDataBoundElement extends OmniElement {
    constructor() {
        super();
    }
    get src() {
        return this.getAttribute("src");
    }
    set src(value) {
        this.setAttribute("src", value);
    }
    tunnelChain(chain, current) {
        if (chain.length === 0) {
            return current;
        }
        else {
            const currentStep = chain.shift();
            return this.tunnelChain(chain, current[currentStep]);
        }
    }
    GetData() {
        var result;
        if (this.src) {
            //this is a bit limited but at least there is no arbitrary execution
            if (this.ParentView?.model != null) {
                if (this.src.indexOf('.') === -1) {
                    result = this.ParentView.model[this.src];
                }
                else {
                    result = this.tunnelChain(this.src.split('.'), this.ParentView.model);
                }
            }
        }
        else {
            result = undefined;
        }
        return result;
    }
    static get observedAttributes() { return ['src']; }
    attributeChangedCallback(name, oldValue, newValue) {
        this.Bind();
    }
}

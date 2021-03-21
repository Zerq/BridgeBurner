import { OmniElement } from "./OmniElement.js";
/* eslint-disable  @typescript-eslint/no-explicit-any */ //I totlly ment to do that!
export abstract class OmniDataBoundElement extends OmniElement {

    constructor() {
        super();
    }

    public abstract Bind(): void;

    public get src(): string {
        return (this.getAttribute("src") as unknown) as string;
    }
    public set src(value: string) {
        this.setAttribute("src", value);
    }


    private tunnelChain(chain: Array<string>, current: any): any {
        if (chain.length === 0) {
            return current;
        } else {
            const currentStep = chain.shift() as string;
            return this.tunnelChain(chain, current[currentStep]);
        }    
    }

    public GetData(): any {
        var result;
        if (this.src) {
            //this is a bit limited but at least there is no arbitrary execution
            if (this.ParentView?.model != null) {
                if (this.src.indexOf('.') === -1) {
                    result = this.ParentView.model[this.src];
                } else {
                    result = this.tunnelChain(this.src.split('.'), this.ParentView.model);
                } 
            }         
        } else {
            result = undefined;
        }

        return result;
    }
    static get observedAttributes() { return ['src']; }
  
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        this.Bind();
    }
  
}
 
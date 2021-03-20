import { OmniDataBoundElement } from "./OmniDataBoundElement.js";
/* eslint-disable  @typescript-eslint/no-explicit-any */ //I totlly ment to do that!
export class OmniBind extends OmniDataBoundElement {

    private span: HTMLSpanElement;
 

    constructor() {
        super();
        this.shadow = this.attachShadow({ "mode": "open" });
        this.wrapper = document.createElement('span') as HTMLSpanElement;
   
        this.span = this.shadowRoot?.querySelector("span") as HTMLSpanElement;
        if (this.span === undefined || this.span === null) {
            this.span = document.createElement("span");
        }
        this.span.className = "Omni-bind";

  
        this.shadowRoot?.append(this.span);

    
    }


    Bind(): void {
        this.span.innerText = this.GetData();
    }
 
    private shadow: ShadowRoot;
    private wrapper: HTMLSpanElement;



}

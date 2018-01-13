import { OutPutLike } from "./outputlike.js";
import { State } from "../util/state.js";
import { ConsoleOutput } from "./consoleoutput.js";

export class MarkupOutput implements OutPutLike {
    write(title: string, message: string, passed: boolean): void {
        let element = document.getElementById(this.containerId);
        if (element) {
            let divTag = document.createElement("div");
            let markerTag = document.createElement("span");
            let titleTag = document.createElement("span");
            let messageTag = document.createElement("span");
            if (passed) {
                markerTag.classList.add("TestPassed");
            }
            else {
                markerTag.classList.add("TestFailed");
            }
            titleTag.innerText = title;
            messageTag.innerText = message;
            divTag.id = title;
            divTag.appendChild(markerTag);
            divTag.appendChild(titleTag);
            divTag.appendChild(messageTag);
            element.appendChild(divTag)
        }
    }



    private static addCss(containerId:string) {
        let style = document.createElement("style");
        style.innerHTML = `
#${containerId} { border:solid 1px black; }
#${containerId} div:nth-child(odd) { background-color: #e4e4e4; }
#${containerId} div { background-color:#f8f8f8; padding:5px; }

#${containerId} span.TestFailed:before {
content: "__";
color: transparent;
background-color: red;
width: 1em;
height: 1em;
border-radius: 50%;
margin: 5px; }

#${containerId} span.TestPassed:before {
content: "__";
color: transparent;
background-color: greenyellow;
width: 1em;
height: 1em;
border-radius: 50%;
margin: 5px;
}`;
        let head = document.getElementsByTagName("head")[0];
        if (head) {
            head.appendChild(style);
        }
    }

    private containerId: string;
    public static async getInstance(containerId: string): Promise<MarkupOutput> {
        await State.Ready();

        MarkupOutput.addCss(containerId);

        let result = new MarkupOutput();
        result.containerId = containerId;
        result.clear();
        return result;       
    }
    clear(): void {
        let element = document.getElementById(this.containerId);
        if (element) {
            element.innerHTML = "";
        }
    }
 
    format(format: string, parameterObject?: any): string {
        return ConsoleOutput.call(this, format, parameterObject);
    }

    private constructor() {

    }
 

}
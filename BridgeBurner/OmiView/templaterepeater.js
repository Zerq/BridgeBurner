"user strict";

export class TemplateRepeater extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({ "mode": "open" });
        var wrapper = document.createElement('div');

        wrapper.className = "Repeater_wrapper";

        const items = Array.from(this.querySelectorAll('item'));

        const template = this.querySelector('template');

        const style = this.querySelector('style');


        wrapper.append(style);

        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            let childItem = document.createElement("div");
            childItem.className = "Repeater_Child";

            const content = document.createTextNode(item.getAttribute("data"));


            let templateClone = template.content.cloneNode(true);



            let assinger = (element, value) => {
                if (element) {
                    var target = element.getAttribute("data-bindtarget");
                    if (target === "CONTENT") {

                        if (value.length) {
                            for (let index in value) {
                                var child = value[index];
                                if (child.innerHTML) {
                                    element.append(child);
                                }
                            }
                        } else {
                            element.innerText = value;
                        }


                    }
                    else {
                        element.setAttribute(target, value);
                    }
                }

            };


            let contentElementToChange = templateClone.querySelector(`*[data-bind='.']`);
            if (contentElementToChange) {
                assinger(contentElementToChange, item.childNodes);

            }

            for (let attrI = 0; attrI < item.attributes.length; attrI++) {
                let attribute = item.attributes[attrI];






                let elementToChange = templateClone.querySelector(`*[data-bind='${attribute.name}']`);
                assinger(elementToChange, attribute.value);
                /*
                if (elementToChange){
                    var target = elementToChange.getAttribute("data-bindtarget");
                    if (target==="CONTENT"){
                        elementToChange.innerText = attribute.value;
                    }
                    else {
                        elementToChange.setAttribute(target, attribute.value);
                    }
                }
                */

            }




            childItem.appendChild(templateClone);

            childItem.setAttribute("name", item.getAttribute("name"));

            wrapper.append(childItem);
        }


        shadow.appendChild(wrapper);
    }




}




let customElementRegistry = window.customElements;
customElementRegistry.define('template-repeater', TemplateRepeater);




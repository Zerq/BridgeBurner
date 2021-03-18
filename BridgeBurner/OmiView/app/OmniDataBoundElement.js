import { OmniElement } from "./OmniElement";
export class OmniDataBoundElement extends OmniElement {
    get src() {
        return this._src;
    }
    set src(value) {
        this._src = value;
    }
    GetData() {
        return this.src(this.ParentView.Model);
    }
}

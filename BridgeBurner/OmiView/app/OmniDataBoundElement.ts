import { OmniElement } from "./OmniElement";

export class OmniDataBoundElement extends OmniElement {

    /* eslint-disable  @typescript-eslint/no-explicit-any */ //I totlly ment to do that!
    private _src: any;
    public get src(): (n: any) => any {
        return this._src;
    }
   public set src(value: (n: any) => any) {
        this._src = value;
    }

    public GetData(): any {
        return this.src(this.ParentView.Model);
    }
    /* eslint-enable  @typescript-eslint/no-explicit-any */
}

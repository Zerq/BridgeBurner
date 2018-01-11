import { OutPutLike } from "./outputlike";
import { Enumerable } from "./enumerable";
import { Assert } from "./assert";

export class ES6UnitTestBase {
    private output_: OutPutLike
    @Enumerable(false)
    public get output(): OutPutLike {
        return this.output_;
    }

    public set output(value: OutPutLike) {
        this.output_ = value;
    }

    @Enumerable(false)
    public get assert(): Assert {
        return Assert.Instance(this);
    }

    @Enumerable(false)
    public runAll(): void {
        for (let index in this) {
            let x = (<any>this[index]).$decorators;

            if (x) {
                let x2 = (<Array<string>>(<any>this)[index].$decorators);
                if (x2.findIndex(n => n === "test") !== -1) {
                    this[index]();
                }
            }
        }
    }
}

 
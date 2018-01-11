import { ES6UnitTestBase } from "./es6unittestbase";

export class Assert {
    private parent: ES6UnitTestBase;
    public constructor(test: ES6UnitTestBase) {
        this.parent = test;
    }

    public areEqual(name: string, expected: any, actual: any, message?: string, parameterObject?: any) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name }
        } else {
            parameterObject["$test"] = name;
        }

        if (expected !== actual) {
            if (message) {
                this.parent.output.write(this.parent.output.format(message, parameterObject));
            } else {
                this.parent.output.write(this.parent.output.format("{$test} failed.", parameterObject));
            }

        } else {
            this.parent.output.write(this.parent.output.format("{$test} passed.", parameterObject));
        }

    }
    public tryExpression(name: string, func: () => void, message?: string, parameterObject?: any) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name }
        } else {
            parameterObject["$test"] = name;
        }

        try {
            func();
            this.parent.output.format("{$test} passed.", parameterObject);
        } catch (error) {
            parameterObject["$errorMessage"] = error;
            if (message) {
                this.parent.output.format(message, parameterObject);
            } else {
                this.parent.output.format("{$test} failed.", parameterObject);
            }
        }
    }
    public tryExpressionAsync(name: string, promiseFunc: Promise<void>, message?: string, parameterObject?: any) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name };
        } else {
            parameterObject["$test"] = name;
        }
        try {
            promiseFunc.then(() => {
                this.parent.output.format("{$test} passed.", parameterObject);
            }).then(e => {
                parameterObject["$errorMessage"] = e;
                if (message) {
                    this.parent.output.write(this.parent.output.format(message, parameterObject));
                } else {
                    this.parent.output.write(this.parent.output.format("{$test} failed.", parameterObject));
                }
            });
        } catch (error) {
            parameterObject["$errorMessage"] = error;
            if (message) {
                this.parent.output.write(this.parent.output.format(message, parameterObject));
            } else {
                this.parent.output.write(this.parent.output.format("{$test} failed.", parameterObject));
            }
        }
    }
    public fail(name: string, message?: string, parameterObject?: any) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name }
        }
        else {
            parameterObject["$test"] = name;
        }


        if (message) {
            this.parent.output.write(this.parent.output.format(message, parameterObject));
        } else {
            this.parent.output.write(this.parent.output.format("{$test} failed.", parameterObject));
        }


    }

    private static aserts: { test: ES6UnitTestBase, assert: Assert }[] = [];
    public static Instance(test: ES6UnitTestBase) {
        let zog = 5;
        let result = Assert.aserts.find(n => n.test == test);
        if (result) {
            return result.assert;
        } else {
            let newItem = { test: test, assert: new Assert(test) };
            Assert.aserts.push(newItem);
            return newItem.assert;
        }

    }

}
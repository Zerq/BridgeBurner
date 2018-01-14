import { ES6UnitTestBase } from "./es6unittestbase.js";
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
                this.parent.output.write(name, this.parent.output.format(message, parameterObject), false);
            } else {
                this.parent.output.write(name,"", false);
            }

        } else {
            this.parent.output.write(name, "", true);
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
            this.parent.output.write(name, "", true);
        } catch (error) {
            parameterObject["$errorMessage"] = error;
            if (message) {
                this.parent.output.write(name, this.parent.output.format(message, parameterObject), false);
            } else {
                this.parent.output.write(name, "", false);
            }
        }
    }
    public async tryExpressionAsync(name: string, func: ()  => void, message?: string, parameterObject?: any) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name }
        } else {
            parameterObject["$test"] = name;
        }

        try {
            await func();
            this.parent.output.write(name, "", true);
        } catch (error) {
            parameterObject["$errorMessage"] = error;
            if (message) {
                this.parent.output.write(name, this.parent.output.format(message, parameterObject), false);
            } else {
                this.parent.output.write(name, "", false);
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
            this.parent.output.write(name, this.parent.output.format(message, parameterObject), false);
        } else {
            this.parent.output.write(name, "", false); 
        }


    }
    public pass(name: string, message?: string, parameterObject?: any) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name }
        }
        else {
            parameterObject["$test"] = name;
        }


        if (message) {
            this.parent.output.write(name, this.parent.output.format(message, parameterObject), true);
        } else {
            this.parent.output.write(name, "", true);
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
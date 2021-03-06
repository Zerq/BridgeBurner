export class Assert {
    constructor(test) {
        this.parent = test;
    }
    areEqual(name, expected, actual, message, parameterObject) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name };
        }
        else {
            parameterObject["$test"] = name;
        }
        if (expected !== actual) {
            if (message) {
                this.parent.output.write(name, this.parent.output.format(message, parameterObject), false);
            }
            else {
                this.parent.output.write(name, "", false);
            }
        }
        else {
            this.parent.output.write(name, "", true);
        }
    }
    tryExpression(name, func, message, parameterObject) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name };
        }
        else {
            parameterObject["$test"] = name;
        }
        try {
            func();
            this.parent.output.write(name, "", true);
        }
        catch (error) {
            parameterObject["$errorMessage"] = error;
            if (message) {
                this.parent.output.write(name, this.parent.output.format(message, parameterObject), false);
            }
            else {
                this.parent.output.write(name, "", false);
            }
        }
    }
    async tryExpressionAsync(name, func, message, parameterObject) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name };
        }
        else {
            parameterObject["$test"] = name;
        }
        try {
            await func();
            this.parent.output.write(name, "", true);
        }
        catch (error) {
            parameterObject["$errorMessage"] = error;
            if (message) {
                this.parent.output.write(name, this.parent.output.format(message, parameterObject), false);
            }
            else {
                this.parent.output.write(name, "", false);
            }
        }
    }
    fail(name, message, parameterObject) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name };
        }
        else {
            parameterObject["$test"] = name;
        }
        if (message) {
            this.parent.output.write(name, this.parent.output.format(message, parameterObject), false);
        }
        else {
            this.parent.output.write(name, "", false);
        }
    }
    pass(name, message, parameterObject) {
        let emptyParameter = false;
        if (parameterObject === undefined) {
            emptyParameter = true;
            parameterObject = { $test: name };
        }
        else {
            parameterObject["$test"] = name;
        }
        if (message) {
            this.parent.output.write(name, this.parent.output.format(message, parameterObject), true);
        }
        else {
            this.parent.output.write(name, "", true);
        }
    }
    static Instance(test) {
        let zog = 5;
        let result = Assert.aserts.find(n => n.test == test);
        if (result) {
            return result.assert;
        }
        else {
            let newItem = { test: test, assert: new Assert(test) };
            Assert.aserts.push(newItem);
            return newItem.assert;
        }
    }
}
Assert.aserts = [];
//# sourceMappingURL=assert.js.map
export function Test() {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = true;
        if (!descriptor.value.$decorators) {
            descriptor.value.$decorators = new Array();
        }
        if (descriptor.value.$decorators.findIndex(n => n === "test") === -1) {
            descriptor.value.$decorators.push("test");
        }
    };
}
//# sourceMappingURL=test.js.map
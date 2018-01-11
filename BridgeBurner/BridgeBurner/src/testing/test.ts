export function Test() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = true;
        if (!descriptor.value.$decorators) {
            descriptor.value.$decorators = new Array<string>();
        }
        if ((<Array<string>>descriptor.value.$decorators).findIndex(n => n === "test") === -1) {
            (<Array<string>>descriptor.value.$decorators).push("test");
        }
    }
}

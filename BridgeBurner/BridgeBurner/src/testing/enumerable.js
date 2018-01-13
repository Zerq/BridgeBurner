export function Enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
//# sourceMappingURL=enumerable.js.map
export class PathUtil {
    static findOrReplace(path, object, newValue) {
        if (!path) {
            return null;
        }
        let item = object[path];
        if (item) {
            return item;
        }
        return PathUtil.traverse(path.split('.'), object, newValue);
    }
    static traverse(search, object, newValue) {
        if (object === undefined) {
            return undefined;
        }
        let property = search.shift();
        if (property) {
            let item = object[property];
            if (search.length === 0) {
                if (newValue !== undefined) {
                    object[property] = newValue;
                    return newValue;
                }
                else {
                    return item;
                }
            }
            else {
                return PathUtil.traverse(search, item, newValue);
            }
        }
    }
}
//# sourceMappingURL=pathutil.js.map
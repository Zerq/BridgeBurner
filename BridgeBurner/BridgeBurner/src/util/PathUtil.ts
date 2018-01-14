export class PathUtil {
    public static findOrReplace(path: string, object: any, newValue?: any): any {

        if (!path) {
            return null;
        }

        let item = object[path];

        if (item) {
            return item;
        }

        return PathUtil.traverse(path.split('.'), object, newValue);
    }
    private static traverse(search: Array<string>, object: any, newValue?: any): any {
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
            else { return PathUtil.traverse(search, item, newValue); }
        }
    }
}

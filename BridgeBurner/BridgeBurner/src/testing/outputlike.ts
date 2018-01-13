export interface OutPutLike {
    write(title: string, message: string, passed: boolean): void;
    format(format: string, parameterObject?: any): string;
    clear():void;
}
export interface OutPutLike {
    write(message: string): void;
    format(format: string, parameterObject?: any): string;
}
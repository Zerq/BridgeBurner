export interface TokenWithPosAndLen<TToken> {
    token: TToken;
    startPos: number;
    length: number;
}
export interface TokenWithLen<TToken> {
    token: TToken;
    length: number;
}
export interface TokenWithStr<TToken> {
    token: TToken;
    str: string;
}
export interface Result {
    typeDiscriminator_Result: string;
}
export interface ResultFactory<TToken, TState> {
    tokens(tokens: TToken[], nextState?: TState): Result;
    tokensWithPos(tokens: TokenWithPosAndLen<TToken>[], nextState?: TState): Result;
    tokensWithLen(tokens: TokenWithLen<TToken>[], nextState?: TState): Result;
    token(token: TToken, nextState?: TState): Result;
    state(nextState: TState): Result;
    nothing(): Result;
}
export declare type Handler<TToken, TState> = (matched: string, ret: ResultFactory<TToken, TState>, state: TState, matchedGroups?: RegExpExecArray) => Result | boolean;
export declare type Predicate<T> = (v: T) => boolean;
export declare class LexerFactory<TToken, TState> {
    private startState;
    private rules;
    constructor(startState?: TState);
    addRule(regex: RegExp | string, handler: Handler<TToken, TState>, statePredicate?: Predicate<TState>): this;
    addDefaultRule(handler?: Handler<TToken, TState>, statePredicate?: Predicate<TState>): this;
    addDefaultSimpleRule(token?: TToken, statePredicate?: Predicate<TState>): this;
    addSimpleRule(regex: RegExp | string, token?: TToken, statePredicate?: Predicate<TState>, nextState?: TState): this;
    addSimpleRules(rules: {
        [char: string]: TToken;
    }, statePredicate?: Predicate<TState>, nextState?: TState): this;
    addRuleWithRegexGroups(regex: RegExp, tokens: TToken[], statePredicate?: Predicate<TState>, nextState?: TState): this;
    getLexerFor(input: string, startState?: TState): Lexer<TToken, TState>;
}
export declare class Lexer<TToken, TState> {
    private input;
    private state;
    private pos;
    private cur;
    private restrained;
    private rules;
    constructor(input: string, rules: any[], state: TState);
    readToEnd(): this;
    readAll(): TToken[];
    readAllWithStr(): TokenWithStr<TToken>[];
    getInput(): string;
    getCur(): TokenWithPosAndLen<TToken>;
    getCurToken(): TToken;
    getCurState(): TState;
    getRestrained(): TokenWithPosAndLen<TToken>[];
    next(): TToken;
}
export declare function matches<T>(...elements: T[]): Predicate<T>;
export declare function matchesNot<T>(...elements: T[]): Predicate<T>;
export declare function and<T>(...ops: Predicate<T>[]): Predicate<T>;
export declare function or<T>(...ops: Predicate<T>[]): Predicate<T>;
export declare function clone<T>(obj: T): T;

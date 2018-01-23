"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function isString(a) { return typeof (a) === "string"; }
function isBool(a) { return typeof (a) === "boolean"; }
var ResultImplementation = (function () {
    function ResultImplementation() {
    }
    return ResultImplementation;
}());
var ResultFactoryImplementation = (function () {
    function ResultFactoryImplementation(matchedString) {
        this.matchedString = matchedString;
    }
    ResultFactoryImplementation.prototype.tokensWithPos = function (tokens, nextState) {
        var r = new ResultImplementation();
        r.nextState = nextState;
        r.matchedString = this.matchedString;
        r.tokens = tokens;
        return r;
    };
    ResultFactoryImplementation.prototype.tokens = function (tokens, nextState) {
        if (tokens.length == 0)
            return this.tokensWithPos([], nextState);
        var t2 = tokens.map(function (t) { return ({ token: t, startPos: 0, length: 0 }); });
        t2[t2.length - 1].length = this.matchedString.length;
        return this.tokensWithPos(t2, nextState);
    };
    ResultFactoryImplementation.prototype.tokensWithLen = function (tokens, nextState) {
        var t2 = tokens;
        var pos = 0;
        for (var _i = 0, t2_1 = t2; _i < t2_1.length; _i++) {
            var t = t2_1[_i];
            t.startPos = pos;
            pos += t.length;
        }
        return this.tokensWithPos(t2, nextState);
    };
    ResultFactoryImplementation.prototype.token = function (token, nextState) {
        return this.tokensWithPos([{ token: token, startPos: 0, length: this.matchedString.length }], nextState);
    };
    ResultFactoryImplementation.prototype.state = function (nextState) {
        return this.tokensWithPos([], nextState);
    };
    ResultFactoryImplementation.prototype.nothing = function () {
        return this.tokensWithPos([]);
    };
    return ResultFactoryImplementation;
}());
var Rule = (function () {
    function Rule(handler, statePredicate) {
        this.handler = handler;
        this.statePredicate = statePredicate;
    }
    Rule.prototype.match = function (str, state) {
        if (this.statePredicate && !this.statePredicate(state))
            return null;
        var _a = this.internalMatch(str), matchedStr = _a[0], matchedGroups = _a[1];
        if (matchedStr == null)
            return null;
        var ret = new ResultFactoryImplementation(matchedStr);
        var result = this.handler(matchedStr, ret, state, matchedGroups);
        if (isBool(result)) {
            if (!result)
                return null;
            return ret.tokens([], state);
        }
        else {
            if (result.nextState === undefined)
                result.nextState = state;
            return result;
        }
    };
    return Rule;
}());
var RegExRule = (function (_super) {
    __extends(RegExRule, _super);
    function RegExRule(regex, handler, statePredicate) {
        _super.call(this, handler, statePredicate);
        this.matchRegex = new RegExp("^" + regex.source);
    }
    RegExRule.prototype.internalMatch = function (str) {
        var matchedGroups = this.matchRegex.exec(str);
        if (matchedGroups == null || matchedGroups.length == 0)
            return [null, null];
        return [matchedGroups[0], matchedGroups];
    };
    return RegExRule;
}(Rule));
var StringRule = (function (_super) {
    __extends(StringRule, _super);
    function StringRule(matchStr, handler, statePredicate) {
        _super.call(this, handler, statePredicate);
        this.matchStr = matchStr;
    }
    StringRule.prototype.internalMatch = function (str) {
        var str2 = str.substr(0, this.matchStr.length);
        if (str2 !== this.matchStr)
            return [null, null];
        return [this.matchStr, null];
    };
    return StringRule;
}(Rule));
var LexerFactory = (function () {
    function LexerFactory(startState) {
        this.startState = startState;
        this.rules = [];
    }
    LexerFactory.prototype.addRule = function (regex, handler, statePredicate) {
        var rule;
        if (isString(regex))
            rule = new StringRule(regex, handler, statePredicate);
        else
            rule = new RegExRule(regex, handler, statePredicate);
        this.rules.push(rule);
        return this;
    };
    LexerFactory.prototype.addDefaultRule = function (handler, statePredicate) {
        if (handler === undefined)
            handler = function (m, ret) { return ret.nothing(); };
        return this.addRule(/[\s\S]/, handler, statePredicate);
    };
    LexerFactory.prototype.addDefaultSimpleRule = function (token, statePredicate) {
        return this.addSimpleRule(/[\s\S]/, token, statePredicate);
    };
    LexerFactory.prototype.addSimpleRule = function (regex, token, statePredicate, nextState) {
        if (token === undefined)
            return this.addRule(regex, function (m, ret) { return ret.state(nextState); }, statePredicate);
        return this.addRule(regex, function (m, ret) { return ret.token(token, nextState); }, statePredicate);
    };
    LexerFactory.prototype.addSimpleRules = function (rules, statePredicate, nextState) {
        for (var c in rules)
            this.addSimpleRule(c, rules[c], statePredicate, nextState);
        return this;
    };
    LexerFactory.prototype.addRuleWithRegexGroups = function (regex, tokens, statePredicate, nextState) {
        return this.addRule(regex, function (m, ret, state, groups) {
            return ret.tokensWithLen(groups.slice(1).map(function (g, idx) { return ({ token: tokens[idx], length: g.length }); }), nextState);
        }, statePredicate);
    };
    LexerFactory.prototype.getLexerFor = function (input, startState) {
        if (startState === undefined)
            startState = (this.startState !== undefined) ? this.startState : null;
        return new Lexer(input, this.rules, startState);
    };
    return LexerFactory;
}());
exports.LexerFactory = LexerFactory;
var Lexer = (function () {
    function Lexer(input, rules, state) {
        this.input = input;
        this.state = state;
        this.pos = 0;
        this.cur = null;
        this.restrained = [];
        this.rules = rules;
    }
    Lexer.prototype.readToEnd = function () {
        while (true) {
            var cur = this.next();
            if (cur === undefined)
                break;
        }
        return this;
    };
    Lexer.prototype.readAll = function () {
        var result = [];
        while (true) {
            var cur = this.next();
            if (cur === undefined)
                break;
            result.push(cur);
        }
        return result;
    };
    Lexer.prototype.readAllWithStr = function () {
        var result = [];
        while (true) {
            var cur = this.next();
            if (cur === undefined)
                break;
            result.push({ token: cur, str: this.input.substr(this.cur.startPos, this.cur.length) });
        }
        return result;
    };
    Lexer.prototype.getInput = function () { return this.input; };
    Lexer.prototype.getCur = function () { return this.cur; };
    Lexer.prototype.getCurToken = function () { return this.cur ? this.cur.token : undefined; };
    Lexer.prototype.getCurState = function () { return this.state; };
    Lexer.prototype.getRestrained = function () { return this.restrained; };
    Lexer.prototype.next = function () {
        while (this.restrained.length == 0) {
            var curStr = this.input.substr(this.pos);
            if (curStr.length == 0) {
                this.cur = undefined;
                return undefined;
            }
            var result = null;
            for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
                var r = _a[_i];
                result = r.match(curStr, this.state);
                if (result != null)
                    break;
            }
            if (result == null)
                throw new Error(curStr + " could not be matched!");
            for (var _b = 0, _c = result.tokens; _b < _c.length; _b++) {
                var t = _c[_b];
                t.startPos += this.pos;
            } // add offset
            this.pos += result.matchedString.length;
            this.state = result.nextState;
            (_d = this.restrained).push.apply(_d, result.tokens);
        }
        this.cur = this.restrained.shift();
        return this.cur.token;
        var _d;
    };
    return Lexer;
}());
exports.Lexer = Lexer;
function matches() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i - 0] = arguments[_i];
    }
    return function (other) { return elements.some(function (element) { return element === other; }); };
}
exports.matches = matches;
function matchesNot() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i - 0] = arguments[_i];
    }
    return function (other) { return !elements.some(function (element) { return element === other; }); };
}
exports.matchesNot = matchesNot;
function and() {
    var ops = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ops[_i - 0] = arguments[_i];
    }
    return function (other) { return ops.every(function (o) { return o(other); }); };
}
exports.and = and;
function or() {
    var ops = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ops[_i - 0] = arguments[_i];
    }
    return function (other) { return ops.some(function (o) { return o(other); }); };
}
exports.or = or;
// from http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
function clone(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj)
        return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}
exports.clone = clone;

export default class CalcToken {
    static PRIORITY_NEUTRAL = -2;

    constructor(tokenStr, priority, lhsArgument, rhsArgument, func) {
        this._tokenStr = tokenStr;
        this._priority = priority;
        this._lhsArgument = lhsArgument;
        this._rhsArgument = rhsArgument;
        this._func = func;
    }

    static getInstance(tokenStr) {
        const operator = CalcToken.getPriorityList().find(
            (token) => token.getTokenStr() === tokenStr
        );
        if (operator) {
            return operator;
        } else if (isNaN(tokenStr)) {
            return new CalcToken(tokenStr, CalcToken.PRIORITY_NEUTRAL);
        } else {
            return new CalcToken(Number(tokenStr), CalcToken.PRIORITY_NEUTRAL);
        }
    }

    static getPriorityList() {
        let i = 0;
        return [
            new CalcToken("log", i++, false, true, (_, b) => Math.log(b)),
            new CalcToken("sin", i++, false, true, (_, b) => Math.sin(b)),
            new CalcToken("cos", i++, false, true, (_, b) => Math.cos(b)),
            new CalcToken("tan", i++, false, true, (_, b) => Math.tan(b)),
            new CalcToken("-", i++, true, true, (a, b) => a - b),
            new CalcToken("+", i++, true, true, (a, b) => a + b),
            new CalcToken("*", i++, true, true, (a, b) => a * b),
            new CalcToken("/", i++, true, true, (a, b) => a / b),
            new CalcToken("^", i++, true, true, (a, b) => a ^ b)
        ];
    }

    getTokenStr() {
        return this._tokenStr;
    }

    getPriority() {
        return this._priority;
    }

    isLHSArgument() {
        return this._lhsArgument;
    }

    isRHSArgument() {
        return this._rhsArgument;
    }

    getFunc() {
        return this._func;
    }
}

CalcToken.prototype.toString = function () {
    return this.getTokenStr();
};

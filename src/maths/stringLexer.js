import CalcToken from "./calcToken";

export default class StringLexer {
    extractTokens(str) {
        const validTokens = [
            "\\(",
            "\\)",
            "\\+",
            "\\*",
            "////",
            "\\-",
            "log",
            "\\d+"
        ];
        const extractTokenRegex = new RegExp(validTokens.join("|"), "gm");
        return Array.from(str.matchAll(extractTokenRegex)).map(
            (arr) => new CalcToken(arr[0])
        );
    }

    findLevel(arr, level) {
        let levelArr = arr;
        for (let i = 1; i < level; i++) {
            levelArr = levelArr.at(-1);
        }
        return levelArr;
    }

    lexString(str) {
        const tokens = this.extractTokens(str);
        let depth = 0;
        let currentInsertingArrPtr = [];
        let outputArr = currentInsertingArrPtr;
        for (let op of tokens) {
            if (op.getTokenStr() === "(") {
                depth++;
                currentInsertingArrPtr = [];
                outputArr.push(currentInsertingArrPtr);
            } else if (op.getTokenStr() === ")") {
                depth--;
                currentInsertingArrPtr = this.findLevel(outputArr, depth);
            } else {
                currentInsertingArrPtr.push(op);
            }
        }
        return currentInsertingArrPtr;
    }
}

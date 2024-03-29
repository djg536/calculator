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
            "\\d+\\.?\\d*"
        ];
        const extractTokenRegex = new RegExp(validTokens.join("|"), "gm");
        return Array.from(str.matchAll(extractTokenRegex)).map((arr) =>
            CalcToken.getInstance(arr[0])
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
        tokens.forEach((op) => {
            if (op.getTokenStr() === "(") {
                depth++;
                const newArr = [];
                currentInsertingArrPtr.push(newArr);
                currentInsertingArrPtr = newArr;
            } else if (op.getTokenStr() === ")") {
                depth--;
                currentInsertingArrPtr = this.findLevel(outputArr, depth);
            } else {
                currentInsertingArrPtr.push(op);
            }
        });
        return outputArr;
    }
}

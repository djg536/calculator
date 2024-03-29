import CalcToken from "../lexer/calcToken.js";
import StringLexer from "../lexer/stringLexer.js";

export default class TokenProcesser {
    process(terminalsArray, operatorIndex) {
        const operator = terminalsArray[operatorIndex];
        const beforeIndex = operator.isLHSArgument()
            ? operatorIndex - 1
            : operatorIndex;
        const afterIndex = operator.isLHSArgument()
            ? operatorIndex + 1
            : operatorIndex;
        const result = operator.getFunc()(
            terminalsArray[beforeIndex],
            terminalsArray[afterIndex]
        );
        terminalsArray.splice(
            beforeIndex,
            afterIndex + 1,
            CalcToken.getInstance(result)
        );
    }

    processTerminals(terminalsArray) {
        let operatorIndex;
        do {
            operatorIndex = this.findFirstOperatorIndex(terminalsArray);
            if (operatorIndex) {
                this.process(terminalsArray, operatorIndex);
            }
        } while (operatorIndex);
        console.info(`Result: ${terminalsArray}`);
        return terminalsArray[0];
    }

    findFirstOperatorIndex(terminalsArray) {
        let firstOperatorIndex;
        let priorityTerminalIndex = -1;
        for (let i = 0; i < terminalsArray.length; i++) {
            const terminal = terminalsArray[i];
            if (terminal.getPriority() >= priorityTerminalIndex) {
                priorityTerminalIndex = terminal.getPriority();
                firstOperatorIndex = i;
            }
        }
        return firstOperatorIndex;
    }

    navigate(tokensArray) {
        tokensArray.forEach((token, i) => {
            if (Array.isArray(token)) {
                tokensArray[i] = this.navigate(token);
                console.info(token);
            }
        });
        console.info(`Processing terminals ${tokensArray}`);
        return this.processTerminals(tokensArray);
    }

    calculate(calculationStr) {
        const lexer = new StringLexer();
        const tokensArray = lexer.lexString(calculationStr);
        this.navigate(tokensArray);
        console.log(`Final result: ${tokensArray[0].getTokenStr()}`);
    }
}

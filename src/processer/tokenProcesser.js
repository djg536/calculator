import CalcToken from "../lexer/calcToken.js";
import { calcTokenArrToString } from "../lexer/calcTokenUtils.js";

export default class TokenProcesser {
    static MODES = {
        STEP: "STEP",
        CONTINUOUS: "CONTINUOUS"
    };

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
        console.debug(`Processing terminals ${terminalsArray}`);
        let operatorIndex;
        do {
            operatorIndex = this.findFirstOperatorIndex(terminalsArray);
            if (operatorIndex) {
                this.process(terminalsArray, operatorIndex);
            }
        } while (operatorIndex);
        console.debug(`Result: ${terminalsArray}`);
        return terminalsArray[0] ?? [];
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

    navigate(arr) {
        const tokensArray = [...arr];
        tokensArray.forEach((token, i) => {
            if (Array.isArray(token)) {
                tokensArray[i] = this.navigate([...token]);
                console.info(token);
            }
        });
        if (
            this._activeMode === TokenProcesser.MODES.CONTINUOUS ||
            this._iteration === 0
        ) {
            this._iteration++;
            return this.processTerminals(tokensArray);
        } else {
            return tokensArray;
        }
    }

    calculate(tokensArray, mode) {
        this._activeMode = mode;
        this._iteration = 0;
        return calcTokenArrToString(this.navigate(tokensArray));
    }
}

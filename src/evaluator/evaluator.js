import StringLexer from "../lexer/stringLexer";
import TokenProcesser from "../processer/tokenProcesser";

export class Evaluator {
    run(calculationStr) {
        console.log(`Evaluating: ${calculationStr}`);

        const lexer = new StringLexer();
        const tokensArray = lexer.lexString(calculationStr);

        console.log(`Tokens: ${tokensArray}`);

        const processer = new TokenProcesser();
        const result = processer.calculate(tokensArray);

        console.log(`Final result: ${result}`);
        return "" + result;
    }
}

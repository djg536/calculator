import { Evaluator } from "./evaluator/evaluator.js";
import TokenProcesser from "./processer/tokenProcesser.js";

export default function CalcButton({
    label,
    calculation,
    setCalculation,
    displayRef
}) {
    const handleClick = () => {
        const getResult = () => {
            if (label === "=") {
                return new Evaluator().run(
                    calculation,
                    TokenProcesser.MODES.CONTINUOUS
                );
            } else if (label === "AC") {
                return "";
            } else if (label === "STEP") {
                return new Evaluator().run(
                    calculation,
                    TokenProcesser.MODES.STEP
                );
            } else {
                return calculation + label;
            }
        };
        setCalculation(getResult());
        displayRef.current.focus();
    };

    return <button onClick={handleClick}>{label}</button>;
}

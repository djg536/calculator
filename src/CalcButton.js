import { Evaluator } from "./evaluator/evaluator.js";

export default function CalcButton({ label, calculation, setCalculation }) {
    const handleClick = () => {
        let result = calculation;
        if (label === "=") {
            result = new Evaluator().run(calculation);
        } else {
            result += label;
        }
        setCalculation(result);
    };

    return <button onClick={handleClick}>{label}</button>;
}

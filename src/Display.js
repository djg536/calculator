import { useRef, useEffect } from "react";
import { Evaluator } from "./evaluator/evaluator";
import TokenProcesser from "./processer/tokenProcesser.js";

export default function Display({
    calculation,
    setCalculation,
    setDisplayInputRef
}) {
    const inputRef = useRef(null);

    const handleChange = (e) => {
        setCalculation(e.target.value);
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            setCalculation(
                new Evaluator().run(
                    calculation,
                    TokenProcesser.MODES.CONTINUOUS
                )
            );
        }
    };

    //When component mounts, populate the reference
    useEffect(() => {
        if (inputRef.current) {
            setDisplayInputRef(inputRef.current);
        }
    });

    return (
        <input
            id="test"
            value={calculation}
            onChange={handleChange}
            onKeyDown={handleEnter}
            ref={inputRef}
        />
    );
}

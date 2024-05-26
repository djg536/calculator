import { useRef, useEffect } from "react";

export default function Display({
    calculation,
    setCalculation,
    setDisplayInputRef
}) {
    const inputRef = useRef(null);

    const handleChange = (e) => {
        setCalculation(e.target.value);
    };

    //When component mounts, populate the reference
    useEffect(() => {
        if (inputRef.current) {
            setDisplayInputRef(inputRef.current);
        }
        console.log(inputRef);
    });

    return (
        <input
            id="test"
            value={calculation}
            onChange={handleChange}
            ref={inputRef}
        />
    );
}

import "./App.css";
import CalcButton from "./CalcButton.js";
import CalcToken from "./lexer/calcToken.js";
import Display from "./Display.js";
import { useState } from "react";

export default function App() {
    const [calculation, setCalculation] = useState("(2*3)+(4-(2+1))");

    const buttonList = [
        CalcToken.getInstance("AC"),
        ...CalcToken.getPriorityList(),
        CalcToken.getInstance("="),
        CalcToken.getInstance("STEP")
    ];

    return (
        <div className="App">
            <header className="App-header">
                <Display
                    calculation={calculation}
                    setCalculation={setCalculation}
                ></Display>

                {buttonList.map((token, i) => (
                    <CalcButton
                        key={i}
                        label={token.getTokenStr()}
                        calculation={calculation}
                        setCalculation={setCalculation}
                    ></CalcButton>
                ))}
            </header>
        </div>
    );
}

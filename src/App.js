import logo from "./logo.svg";
import "./App.css";
import TokenProcesser from "./processer/tokenProcesser.js";

function App() {
    const processor = new TokenProcesser();
    processor.calculate("5*2+(3-(2*2))");

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;

export default function Display({ calculation, setCalculation }) {
    const handleChange = (e) => {
        setCalculation(e.target.value);
    };
    return <input id="test" value={calculation} onChange={handleChange} />;
}

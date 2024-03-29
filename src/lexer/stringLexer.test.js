import StringLexer from "./stringLexer";
import CalcToken from "./calcToken";

const testArrayEquals = (actual, expected) => {
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
};

test("Find level", () => {
    const lexer = new StringLexer();
    const arrToFind = [5];
    const arr = [arrToFind];
    expect(lexer.findLevel(arr, 2)).toBe(arrToFind);
});

test("Parse decimal numbers", () => {
    const lexer = new StringLexer();
    testArrayEquals(lexer.extractTokens("4.6"), [CalcToken.getInstance(4.6)]);
});

test("Parse brackets", () => {
    const lexer = new StringLexer();
    testArrayEquals(lexer.extractTokens("(4.6)"), [
        CalcToken.getInstance("("),
        CalcToken.getInstance(4.6),
        CalcToken.getInstance(")")
    ]);
});

test("Parse multiple decimal numbers", () => {
    const lexer = new StringLexer();
    testArrayEquals(lexer.extractTokens("4.6-3.1"), [
        CalcToken.getInstance(4.6),
        CalcToken.getInstance("-"),
        CalcToken.getInstance(3.1)
    ]);
});

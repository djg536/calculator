import StringLexer from "./stringLexer";
import CalcToken from "./calcToken";

const testArrayEquals = (actual, expected) => {
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
};

test("Find zeroth level", () => {
    const valToFind = 5;
    const arr = valToFind;
    expect(new StringLexer().findLevel(arr, 0)).toBe(valToFind);
});

test("Find first level", () => {
    const valToFind = 5;
    const arr = [valToFind];
    expect(new StringLexer().findLevel(arr, 2)).toBe(valToFind);
});

test("Find second level", () => {
    const arrToFind = [5];
    const arr = [arrToFind];
    expect(new StringLexer().findLevel(arr, 2)).toBe(arrToFind);
});

test("Find third level", () => {
    const arrToFind = [5];
    const arr = [2, [arrToFind]];
    expect(new StringLexer().findLevel(arr, 3)).toBe(arrToFind);
});

test("Find fourth level", () => {
    const arrToFind = [5];
    const arr = [2, "-", [3, "+", [arrToFind]]];
    expect(new StringLexer().findLevel(arr, 4)).toBe(arrToFind);
});

test("Parse single numbers", () => {
    testArrayEquals(new StringLexer().extractTokens("5"), [
        CalcToken.getInstance(5)
    ]);
});

test("Parse decimal numbers", () => {
    testArrayEquals(new StringLexer().extractTokens("4.6"), [
        CalcToken.getInstance(4.6)
    ]);
});

test("Parse brackets", () => {
    testArrayEquals(new StringLexer().extractTokens("(4.6)"), [
        CalcToken.getInstance("("),
        CalcToken.getInstance(4.6),
        CalcToken.getInstance(")")
    ]);
});

test("Parse multiple decimal numbers", () => {
    testArrayEquals(new StringLexer().extractTokens("4.6-3.1"), [
        CalcToken.getInstance(4.6),
        CalcToken.getInstance("-"),
        CalcToken.getInstance(3.1)
    ]);
});

test("Whitespace ignored", () => {
    testArrayEquals(new StringLexer().extractTokens("  4.6"), [
        CalcToken.getInstance(4.6)
    ]);
});

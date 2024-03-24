import StringLexer from "./stringLexer";

test("Test find level", () => {
    const processor = new StringLexer();
    const arrToFind = [5];
    const arr = [arrToFind];
    expect(processor.findLevel(arr, 2)).toBe(arrToFind);
});

import MathsProcessor from "./mathsProcessor";

test("Test find level", () => {
    const processor = new MathsProcessor();
    const arrToFind = [5];
    const arr = [arrToFind];
    expect(processor.findLevel(arr, 2)).toBe(arrToFind);
});

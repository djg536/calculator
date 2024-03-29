import { Evaluator } from "./evaluator";

test("Inner brackets", () => {
    expect(new Evaluator().run("2*3")).toBe(6);
});

test("A single value within brackets", () => {
    expect(new Evaluator().run("(2)")).toBe(2);
});

test("A single value within brackets calculation", () => {
    expect(new Evaluator().run("2*(3)")).toBe(6);
});

test("A single value twice within brackets calculation", () => {
    expect(new Evaluator().run("(2)*(3)")).toBe(6);
});

test("A single value returns itself", () => {
    expect(new Evaluator().run("2.2")).toBe(2.2);
});

test("A single value within inner brackets", () => {
    expect(new Evaluator().run("((2))")).toBe(2);
});

test("Decimal point calculations", () => {
    expect(new Evaluator().run("1.5+4")).toBe(5.5);
});

test("Evaluated calculations", () => {
    expect(new Evaluator().run("5*2+(3-(2*2))")).toBe(9);
});

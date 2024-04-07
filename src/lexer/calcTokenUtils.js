export const calcTokenArrToString = (calc) => {
    const getArrayStr = (tokensArray) => {
        return tokensArray.reduce((str, elem) => {
            return (
                str +
                (Array.isArray(elem)
                    ? `(${getArrayStr(elem)})`
                    : elem.getTokenStr())
            );
        }, "");
    };
    if (Array.isArray(calc)) {
        return getArrayStr(calc);
    } else {
        return calc.getTokenStr();
    }
};

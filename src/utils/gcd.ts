export const gcd = (num1: number, num2: number) => {
    let max = Math.max(num1, num2);
    let min = Math.min(num1, num2);
    let mod = 0;

    while (min !== 0) {
        mod = max % min;
        max = min;
        min = mod;
    }

    return max;
};



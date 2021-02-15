import { gcd } from "./gcd";

describe('Greatest Common Divisor', () => {
    it('GCD of 0 and n equals n', () => {
        const n = 2;

        expect(gcd(0, 2)).toBe(n);
    });

    describe('GCD only support non-negative values', () => {
        it('Only one value negative', () => {
            expect(() => gcd(0, -2)).toThrow();
            expect(() => gcd(-3, 2)).toThrow();
        });

        it('Both values negative', () => {
            expect(() => gcd(-3, -2)).toThrow();
        });
    });

    describe('GCD of 10 45 equals 5', () => {
        expect(gcd(10, 45)).toBe(5);
    });
});

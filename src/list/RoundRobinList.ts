import {ListItem} from "./ListItem";
import { gcd } from "../utils/gcd";

export class RoundRobinList<Type = unknown> {
    private readonly values: Set<Type>;
    private readonly weights: number[];
    private current: number;
    private currentWeight: number;
    private maxWeight: number;
    private gcd: number;

    constructor(values = new Set<Type>(), weights: number[] = []) {
        this.ensureSameSize(values, weights);

        this.values = values;
        this.weights = weights;

        this.current = -1;
        this.currentWeight = 0;
        this.maxWeight = this.calculateMaxWeight();
        this.gcd = this.calculateGcd();
    }

    private ensureSameSize(values: Set<Type>, weights: number[]) {
        if (values.size !== weights.length) {
            throw new Error('Not equal length');
        }
    }

    private calculateMaxWeight(): number {
        return this.weights.reduce((previous, current) => current > previous ? current : previous, 0);
    }

    private calculateGcd(): number {
        return this.weights.reduce((previous, current) => gcd(previous, current), 0);
    }

    private calculateWeight(weight: number) {
        return weight < 0 ? 0 : weight;
    }

    private reset() {
        this.current = -1;
        this.currentWeight = 0;
        this.maxWeight = this.calculateMaxWeight();
        this.gcd = this.calculateGcd();
    }

    size(): number {
        return this.values.size;
    }

    add({ value, weight = 0 }: ListItem<Type>): void {
        this.values.add(value);
        this.weights.push(this.calculateWeight(weight));

        this.reset();
    }

    next(index?: number): Type | null {
        if (this.size() === 0) {
            return null;
        }

        if (index !== undefined) {
            this.current = index;
        }

        this.current = (this.current + 1) % this.size();
        if (this.current === 0) {
            this.currentWeight -= this.gcd;

            if (this.currentWeight <= 0) {
                this.currentWeight = this.maxWeight;
            }
        }

        if (this.currentWeight === 0) {
            return null;
        }

        if (this.weights[this.current] >= this.currentWeight) {
            return [...this.values][this.current];
        }

        return null;
    }
}

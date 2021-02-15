import { ListItem } from "./ListItem";
import { gcd } from "../utils/gcd";

export class RoundRobinList<Type = unknown> {
    private readonly items: ListItem<Type>[];
    private current: number;
    private currentWeight: number;
    private maxWeight: number;
    private gcd: number;

    constructor(items: ListItem<Type>[] = []) {
        this.items = items;

        this.current = -1;
        this.currentWeight = 0;
        this.maxWeight = this.calculateMaxWeight();
        this.gcd = this.calculateGcd();
    }

    private calculateMaxWeight(): number {
        return this.items.reduce((max, { weight }) => max < weight ? weight : max, 0);
    }

    private calculateGcd(): number {
        return this.items.reduce((result, { weight }) => gcd(result, weight), 0);
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
        return this.items.length;
    }

    add({ value, weight = 0 }: ListItem<Type>): void {
        this.items.push({
           value,
           weight: this.calculateWeight(weight)
        });

        this.reset();
    }

    next(index?: number) {
        if (this.size() === 0) {
            return null;
        }

        if (index !== undefined) {
            this.current = index;
            this.currentWeight = this.items[index].weight;
        }

        while (true) {
            this.current = (this.current + 1) % this.size();

            if (this.current === 0) {
                this.currentWeight = this.currentWeight - this.gcd;

                if (this.currentWeight <= 0) {
                    this.currentWeight = this.maxWeight;
                }
            }

            if (this.currentWeight === 0) {
                return null;
            }

            const { value, weight } = this.items[this.current];

            if (weight >= this.currentWeight) {
                return value;
            }
        }
    }
}

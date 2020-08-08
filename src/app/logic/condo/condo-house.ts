import { Ground } from '../modeling/ground';

export class CondoHouse extends Ground {
    number: number;

    constructor(size: number) {
        super(size);
        this.number = 0;
    }

    setNumber(number: number) {
        this.number = number;
    }
}

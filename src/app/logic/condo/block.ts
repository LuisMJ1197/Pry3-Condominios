import { CondoHouse } from './condo-house';
import { Ground } from '../modeling/ground';

export class Block {
    letter: string;
    houses: Ground[] = [];

    constructor(letter: string) {
        this.letter = letter;
    }

    setHousesNumber () {
    }

    addHouse(ground: Ground) {
        this.houses.push(ground);
    }
}

import { CondoHouse } from './condo-house';

export class Block {
    letter: string;
    houses: CondoHouse[] = [];

    constructor(letter: string) {
        this.letter = letter;
    }

    setHousesNumber () {
    }

    addHouse(ground: CondoHouse) {
        this.houses.push(ground);
    }
}

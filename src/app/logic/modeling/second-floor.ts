import { Floor } from './floor';
import { Resource } from '../generalSettings/resource';

export class SecondFloor extends Floor {
    constructor(width: number, height: number) {
        super(width, height);
        this.backgroundCcolor = Resource.secondBackgroundColor;
        this.number = 2;
    }
}

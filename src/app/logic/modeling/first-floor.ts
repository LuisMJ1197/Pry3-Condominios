import { Floor } from './floor';
import { Resource } from '../generalSettings/resource';

export class FirstFloor extends Floor {
    
    constructor(width: number, height: number) {
        super(width, height);
        this.backgroundCcolor = Resource.firstBackgroundColor;
    }
}

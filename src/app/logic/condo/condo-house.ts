import { Ground } from '../modeling/ground';
import { IDesign } from '../decorator/idesign';
import { House } from '../modeling/house';
import { Owner } from './owner';

export class CondoHouse implements IDesign {
    design: IDesign;
    number: number;
    owner: Owner;

    constructor(design: IDesign) {
        this.design = design;
        this.number = 0;
    }

    getImage() {
        return this.design.getImage();
    }
    
    getHouse(): House {
        return this.design.getHouse();
    }

    setNumber(number: number) {
        this.number = number;
    }

    getNumber() {
        return this.number;
    } 

    setOwner(owner: Owner) {
        this.owner = owner;
    }

    getOwner() {
        return this.owner;
    }

    createImage(canvas: HTMLCanvasElement) {
        this.design.createImage(canvas);
    }
}

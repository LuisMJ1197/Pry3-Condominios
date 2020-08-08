import { Architect } from './architect';
import { Ground } from '../modeling/ground';

export class Senior1Architect extends Architect {
    constructor(firstname: string, lastname: string, lastname2: string, 
        experienceyears: number) {
               super(firstname, lastname, lastname2, experienceyears, "Senior1");
           }

    design(ground: Ground): void {
        if (ground.size >= 200 && ground.size <= 400) {
            ground.setDesigner(this);
        } else {
            this.next.design(ground);
        }
    }      
}

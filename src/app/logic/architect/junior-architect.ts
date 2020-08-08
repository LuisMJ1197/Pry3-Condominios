import { Architect } from './architect';
import { IDesigner } from './idesigner';
import { Ground } from '../modeling/ground';

export class JuniorArchitect extends Architect {

    constructor(firstname: string, lastname: string, lastname2: string, 
     experienceyears: number) {
            super(firstname, lastname, lastname2, experienceyears, "Junior");
        }
    
    design(ground: Ground): void {
        if (ground.size < 200) {
            ground.setDesigner(this);
        } else {
            this.next.design(ground);
        }
    }        
}

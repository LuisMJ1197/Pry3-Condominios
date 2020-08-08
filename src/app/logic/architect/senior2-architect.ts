import { Architect } from './architect';
import { Ground } from '../modeling/ground';

export class Senior2Architect extends Architect {
    constructor(firstname: string, lastname: string, lastname2: string, 
        experienceyears: number) {
               super(firstname, lastname, lastname2, experienceyears, "Senior2");
           }

    design(ground: Ground): void {
        if (ground.size > 400) {
            ground.setDesigner(this);
        }
    }      
}

import { IDesigner } from './idesigner';
import { Ground } from '../modeling/ground';
import {jsonIgnore} from 'json-ignore';

export abstract class Architect implements IDesigner {
    static JUNIOR: number = 0;
    static SENIOR1: number = 1;
    static SENIOR2: number = 2;
    static levels: string[] = ["Junior", "Senior1", "Senior2"];
    @jsonIgnore()
    next: IDesigner;

    constructor(public firstname: string, public lastname: string, public lastname2: string, 
        public experienceyears: number, public level: string) {
        
    }

    setNext(next: IDesigner): void{
        this.next = next;
    };

    getNext(): IDesigner {
        return this.next;
    }
    
    abstract design(ground: Ground): void;
}

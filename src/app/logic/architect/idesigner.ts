import { Ground } from '../modeling/ground';

export interface IDesigner {
    setNext(next: IDesigner): void;
    getNext(): IDesigner;
    design(ground: Ground): void;
}

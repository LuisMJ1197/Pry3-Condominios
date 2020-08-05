import { IOriginator } from './ioriginator';

export interface ISnapshot {
    
    getState(): any;
    
    getObject(): IOriginator;
}

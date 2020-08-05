import { IOriginator } from './ioriginator';

export class FloorSnapshot {
    state: any;
    originator: IOriginator;
    constructor(originator: IOriginator, x: number, y: number, width: number, height: number) {
        this.state = {
            x: x,
            y: y,
            width: width,
            height: height
        };
        this.originator = originator;
    }

    getState(): any {
        return this.state;
    }

    getObject(): IOriginator {
        return this.originator;
    }}

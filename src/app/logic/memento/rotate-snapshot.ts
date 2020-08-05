import { ISnapshot } from './isnapshot';
import { IOriginator } from './ioriginator';

export class RotateSnapshot implements ISnapshot {
    state: any;
    originator: IOriginator;

    constructor(originator: IOriginator, x: number, y: number, width: number, height: number, kind: number, angle: number) {
        this.state = {
            x: x,
            y: y,
            width: width,
            height: height,
            kind: kind,
            angle: angle
        };
        this.originator = originator;
    }

    getState(): any {
        return this.state;
    }

    getObject(): IOriginator {
        return this.originator;
    }
}

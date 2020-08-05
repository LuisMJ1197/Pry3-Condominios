import { ISnapshot } from './isnapshot';
import { IOriginator } from './ioriginator';

export class HouseSnapshot implements ISnapshot{
    state: any;
    originator: IOriginator;

    constructor(originator: IOriginator, hasSecondFloor: boolean, hasHotWater: boolean, rooms: any[]) {
        this.state = {
            hasSecondFloor: hasSecondFloor,
            hasHotWater: hasHotWater,
            rooms: rooms
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

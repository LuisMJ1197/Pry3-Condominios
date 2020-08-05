import { ISnapshot } from './isnapshot';
import { Drawable } from '../drawing/drawable';
import { IOriginator } from './ioriginator';

export class SnapshotCareTaker{
    private snapshots: ISnapshot[] = [];
    pointer: number = 0;
    b: boolean = false;

    constructor() {
    }

    public backup(originator: IOriginator): void {
        this.snapshots.splice(this.pointer, this.snapshots.length - (this.pointer));
        this.snapshots.push(originator.save());
        this.pointer = this.snapshots.length;
    }

    public addState(originator: IOriginator): void {
        if (this.pointer >= this.snapshots.length) {
            this.snapshots.push(originator.save());
            this.b = true;
        }
    }

    public undo(): void {
        if (this.snapshots.length <= 0 || this.pointer <= 0) {
            return;
        }
        const snapshot = this.snapshots[this.pointer - 1];
        snapshot.getObject().restore(snapshot);
        this.pointer -= 1;
        /*if (this.b) {
            this.pointer += 1;
            this.b = false;
        }*/
    }

    public redo(): void {
        if (this.pointer + 1 >= this.snapshots.length) return;
        this.pointer += 1;
        const snapshot = this.snapshots[this.pointer];
        snapshot.getObject().restore(snapshot);
    }

}

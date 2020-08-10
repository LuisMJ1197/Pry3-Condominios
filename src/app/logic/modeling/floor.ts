import { DrawableFloor } from '../drawing/drawable-floor';
import { ISnapshot } from '../memento/isnapshot';
import { FloorSnapshot } from '../memento/floor-snapshot';

export class Floor extends DrawableFloor {
    constructor(width: number, height: number) {
        super(width, height, 0, 0);
    }

    getCenter(): number[] {
        return [this.baseFloor.getCenter()[0] + this.width/2, this.baseFloor.getCenter()[1] + this.height/2];
    }

    draw(ctx: CanvasRenderingContext2D):void {
        super.draw(ctx);
    }

    save(): ISnapshot {
        return new FloorSnapshot(this, this.x, this.y, this.width, this.height);
    }

    restore(snapshot: ISnapshot): void {
        this.x = snapshot.getState().x;
        this.y = snapshot.getState().y;
        this.width = snapshot.getState().width;
        this.height = snapshot.getState().height;
    }
}

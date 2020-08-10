import { Resource } from '../generalSettings/resource';
import { Drawable } from './drawable';
import { ObjectConfigurator } from 'src/app/view-logic/object-configurator';
import { ISnapshot } from '../memento/isnapshot';
import { jsonIgnore } from 'json-ignore';
import { IconDrawer } from '../bridge/icon-drawer';

export abstract class DrawableRoom extends Drawable {
    @jsonIgnore()
    protected backgroundCcolor: string = Resource.roomBackgroundColor;
    @jsonIgnore()
    protected borderColor: string = Resource.roomBorderColor;
    @jsonIgnore()
    protected selectedBorderColor: string = Resource.selectedBorderColor;
    kind: number = 3;

    constructor(width: number, height: number, x: number, y: number) {
        super(width, height, x, y);
        this.drawAPI = new IconDrawer();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.calculateDxDy();
        ctx.save();
        ObjectConfigurator.configRoom(ctx, Resource.roomFill[this.kind]);
        ctx.fillRect(this.dx, this.dy, this.getPixelWidth(), this.getPixelHeight());
        ctx.restore();
        this.drawAPI.draw(ctx, this);
    }

    save(): ISnapshot {
        return null;
        //return new GroundSnapshot(this.x, this.y, this.width, this.height);
    }

    restore(snapshot: ISnapshot): void {
        this.x = snapshot.getState().x;
        this.y = snapshot.getState().y;
        this.width = snapshot.getState().width;
        this.height = snapshot.getState().height;
    }

}

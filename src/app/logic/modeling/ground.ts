import { DrawableGround } from '../drawing/drawable-ground';
import { House } from './house';
import { ISnapshot } from '../memento/isnapshot';
import { Dimention } from '../generalSettings/dimention';
import { BorderedShape } from '../decorator/bordered-shape';
import { Architect } from '../architect/architect';
import { jsonIgnore } from 'json-ignore';
import { IPrototype } from '../prototype/iprototype';

export class Ground extends DrawableGround implements IPrototype {
    private house: House;
    @jsonIgnore()
    image: string;
    architect: Architect;
    _id: string = null;

    constructor(size: number) {
        super(size, 0, 0);
        this.house = new House();
        this.house.getFirstFloor().setBaseFloor(this);
    }

    setArchitect(architect: Architect) {
        this.architect = architect;
    }

    setDesigner(architect: Architect): void {
        this.architect = architect;
    }

    getCenter(): number[] {
        return [(this.x + this.getPixelWidth()/2), (this.y + this.getPixelHeight()/2)];
    }
    
    getArea(): number {
        return this.size;
    }

    getHouse() {
        return this.house;
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

    createImage(canvas: HTMLCanvasElement) {
        var ctx = canvas.getContext("2d");
        const centerXY = [(canvas.width - Dimention.meterPixelSize)/2, (canvas.height - Dimention.meterPixelSize)/2];
        this.draw(ctx)
        new BorderedShape(this.getHouse().getFirstFloor())
        .draw(ctx);
        this.getHouse().drawRooms(ctx, this.getHouse().getFirstFloor().number);  
        if (this.getHouse().hasSecondFloor) {
        this.getHouse().getSecondFloor().calculateDxDy();
        }
        new BorderedShape(this.getHouse().getSecondFloor())
            .draw(ctx);
            this.getHouse().drawRooms(ctx, this.getHouse().getSecondFloor().number); 
        if (this.getHouse().hasStair()) {
            this.getHouse().stair.draw(ctx);
        }
        this.image = canvas.toDataURL("image/png");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    clone(): Ground {
        return Object.create(this) as Ground;
    }
}

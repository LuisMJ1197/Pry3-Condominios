import { DrawableRoom } from '../drawing/drawable-room';
import { Drawable } from '../drawing/drawable';
import { ISnapshot } from '../memento/isnapshot';
import { RoomSnapshot } from '../memento/room-snapshot';

export class Room extends DrawableRoom {
    public static BEDROOM: number = 2;
    public static SIMPLE_BATHROOM: number = 0;
    public static COMPLETE_BATHROOM: number = 1;
    public static LIVING_ROOM:number = 3;
    public static KITCHEN:number = 4;
    public static DINING_ROOM:number = 5;
    public static TERRACE:number = 6;
    public static BALCONY:number = 7;
    public static BARBECUE:number = 8;
    public static GARAGE:number = 9;
    public static WALKING_CLOSET:number = 10;
    public static OFFICE:number = 11;
    public static STORAGE:number = 12;
    public static WASHING_ROOM:number = 13;
    public static MAIN_BEDROOM: number = 14;
    public static sCantRooms: number = -1;
    floorNumber: number = 1;
    
    constructor(width: number, height: number, kind: number) {
        super(width, height, 0, 0);
        this.kind = kind;
        Room.sCantRooms += 1;
    }

    getCenter(): number[] {
        return [this.baseFloor.getCenter()[0] + this.width/2, this.baseFloor.getCenter()[1] + this.height/2];
    }

    getBaseFloor() {
        return this.baseFloor;
    }
    
    genLimits(): void {
        this.limitLeft = 0;
        this.limitTop = 0;
        this.limitRight = this.baseFloor.getWidth();
        this.limitBottom = this.baseFloor.getHeight();
    }
    
    
    save(): ISnapshot {
        return new RoomSnapshot(this, this.x, this.y, this.width, this.height, this.kind);
    }

    restore(snapshot: ISnapshot): void {
        this.x = snapshot.getState().x;
        this.y = snapshot.getState().y;
        this.width = snapshot.getState().width;
        this.height = snapshot.getState().height;
        this.kind = snapshot.getState().kind;
    }
}

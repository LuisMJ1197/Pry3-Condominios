import { Resource } from '../logic/generalSettings/resource';

export class ObjectConfigurator {
    
    public static configGround(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 8;
        var pat = ctx.createPattern(Resource.groundFill, "repeat");
        ctx.fillStyle = pat;   
    }

    public static configGroundText(ctx: CanvasRenderingContext2D) {
        ctx.font = "20px Arial";    
        ctx.fillStyle = Resource.groundAreaTextColor;
        ctx.textAlign = "center";
    }

    public static configFirstFloor(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 5;
        var pat = ctx.createPattern(Resource.firstFloorFill, "repeat");
        ctx.fillStyle = pat;
    }

    public static configSecondFloor(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 5;
        var pat = ctx.createPattern(Resource.secondFloorFill, "repeat");
        ctx.fillStyle = pat;
    }

    static configRoom(ctx: CanvasRenderingContext2D, kind: HTMLImageElement) {
        ctx.lineWidth = 5;
        var pat = ctx.createPattern(kind, "repeat");
        ctx.fillStyle = pat;
    }
}

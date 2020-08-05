export interface IDrawable {
    draw(ctx: CanvasRenderingContext2D): void;
    
    /*getCenter(): number[];
    genLimits(): void;
    */
    isSelected: boolean;
    getWidth(): number;
    getHeight(): number;
    /*setWidth(value: number);
    setHeight(value: number);*/
    getPixelWidth(): number;
    getPixelHeight(): number;

    getDX(): number;
    getDY(): number;

    /*getX(): number;
    getY(): number;*/

    /*setX(x: number): void;
    setY(y: number): void;*/

    /*calculateDxDy(): void;
    getBaseFloor(): IDrawable;*/
}

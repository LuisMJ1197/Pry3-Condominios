export class Color {
    public static groundBackgroundColor: string = "#ABD65D";
    public static groundBorderColor: string = "#000000";
    public static groundAreaTextColor: string = "#78290f";

    public static firstBackgroundColor: string = "#BFBFBF";
    public static firstBorderColor: string = "#413b3b";
    public static firstAreaTextColor: string = "#78290f";

    public static secondBackgroundColor: string = "#D9D9D9";
    public static secondBorderColor: string = "#A6A6A6";
    public static secondAreaTextColor: string = "#78290f";

    public static groundFill: HTMLImageElement = new Image(12, 12);
    public static firstFloorFill: HTMLImageElement = new Image(12, 12);
    public static secondFloorFill: HTMLImageElement = new Image(12, 12);

    public static selectedBorderColor: string = "#000000";

    public static init(): void {
        Color.groundFill.src = "/assets/terrain/grass_green_d.jpg";
        Color.firstFloorFill.src = "/assets/terrain/firstfloor.jpg";
        Color.secondFloorFill.src = "/assets/terrain/secondfloor.jpg";
    }
}

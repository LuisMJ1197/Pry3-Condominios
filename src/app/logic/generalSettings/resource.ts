export class Resource {
    public static groundBackgroundColor: string = "#ABD65D";
    public static groundBorderColor: string = "#000000";
    public static groundAreaTextColor: string = "#78290f";

    public static firstBackgroundColor: string = "#BFBFBF";
    public static firstBorderColor: string = "#413b3b";
    public static firstAreaTextColor: string = "#78290f";

    public static secondBackgroundColor: string = "#D9D9D9";
    public static secondBorderColor: string = "#A6A6A6";
    public static secondAreaTextColor: string = "#78290f";

    public static groundFill: HTMLImageElement = new Image(100, 100);
    public static firstFloorFill: HTMLImageElement = new Image(24, 24);
    public static secondFloorFill: HTMLImageElement = new Image(24, 24);
    public static bedroomFloorFill: HTMLImageElement = new Image(24, 24);

    public static simpleBathroomFill: HTMLImageElement = new Image(54, 27);
    public static completeBathroomFill: HTMLImageElement = new Image(54, 54);

    public static selectedBorderColor: string = "#FA5B3D";
    
    public static roomBackgroundColor: string = "#FFF";
    public static roomBorderColor: string = "#413b3b";

    public static bedroomIcon: HTMLImageElement = new Image(24, 24);
    public static mainBedroomIcon: HTMLImageElement = new Image(24, 24);
    public static closetIcon: HTMLImageElement = new Image(24, 24);
    
    public static roomFill: HTMLImageElement[] = [
        Resource.simpleBathroomFill,
        Resource.completeBathroomFill,
        Resource.bedroomFloorFill
    ];

    public static icons: HTMLImageElement[] = [
        Resource.simpleBathroomFill,
        Resource.completeBathroomFill,
        Resource.bedroomIcon];
    public static bathroomsImagePath: string[] = ["/assets/terrain/simplebathroom.png", "/assets/terrain/completebathroom.png"];
    public static iconsPath: string[] = [
        "/assets/icons/livingroom.png",
        "/assets/icons/kitchen.png",
        "/assets/icons/diningroom.png",
        "/assets/icons/terrace.png",
        "/assets/icons/balcony.png",
        "/assets/icons/barbecue.png",
        "/assets/icons/garage.png",
        "/assets/icons/walkingcloset.png",
        "/assets/icons/office.png",
        "/assets/icons/storage.png",
        "/assets/icons/washingroom.png"
    ];
    public static floorsPath: string[] = [
        "/assets/terrain/livingroomfloor.jpg",
        "/assets/terrain/kitchenfloor.jpg",
        "/assets/terrain/diningroomfloor.jpg",
        "/assets/terrain/terracefloor.jpg",
        "/assets/terrain/balconyfloor.jpg",
        "/assets/terrain/barbecuefloor.jpg",
        "/assets/terrain/garagefloor.jpg",
        "/assets/terrain/walkinclosetfloor.jpg",
        "/assets/terrain/officefloor.jpg",
        "/assets/terrain/storagefloor.jpg",
        "/assets/terrain/washingroomfloor.jpg"
    ];

    public static stairs: HTMLImageElement[] = [];

    public static init(): void {
        Resource.groundFill.src = "/assets/terrain/grass_green_d.jpg";
        Resource.firstFloorFill.src = "/assets/terrain/firstfloor.jpg";
        Resource.secondFloorFill.src = "/assets/terrain/secondfloor.jpg";
        Resource.bedroomFloorFill.src = "/assets/terrain/bedroomfloor.jpg";
        Resource.bedroomIcon.src = "/assets/icons/mainbedroom.png";
        Resource.mainBedroomIcon.src = "/assets/icons/bed.png";
        Resource.simpleBathroomFill.src = "/assets/terrain/simplebathroom.png";
        Resource.completeBathroomFill.src = "/assets/terrain/completebathroom.png";
        Resource.closetIcon.src = "/assets/icons/closet.png";
        Resource.iconsPath.forEach(path => {
            var img = new Image(24, 24);
            img.src = path;
            Resource.icons.push(img);
        });
        Resource.floorsPath.forEach(path => {
            var img = new Image(24, 24);
            img.src = path;
            Resource.roomFill.push(img);
        });
        Resource.roomFill.push(Resource.bedroomFloorFill);
        var img = new Image();
        img.src = "/assets/stairs/straightstair.png";
        Resource.stairs.push(img);
        var img = new Image();
        img.src = "/assets/stairs/ustairs.png";
        Resource.stairs.push(img);
        var img = new Image();
        img.src = "/assets/stairs/espiralstair.png";
        Resource.stairs.push(img);
        Resource.icons.push(this.mainBedroomIcon);
    }
}

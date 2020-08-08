export class CommonArea {
    static SWIMMING_POOL: number = 0;
    static GYM: number = 1;
    static KINDER_GARDEN: number = 2;
    static SOCCER_FIELD: number = 3;
    static TENNIS_FIELD: number = 4;
    static PARK: number = 5;
    static commonAreas: string[] = [
        "Piscina",
        "Gimnasio",
        "Guardería",
        "Cancha de Football",
        "Cancha de Tennis",
        "Parque"
    ]

    constructor(public kind: number, public cant: number) {

    }
}

import { Block } from './block';
import { CommonArea } from './common-area';

export class CondoProject {
    _id: string = null;
    name: string;
    provincia: string;
    canton: string;
    distrito: string;
    senias: string;
    contactname: string;
    phonenumber: string;
    blocks: Block[] = [];
    commonAreas: CommonArea[] = [
        new CommonArea(CommonArea.SWIMMING_POOL, 0),
        new CommonArea(CommonArea.GYM, 0),
        new CommonArea(CommonArea.KINDER_GARDEN, 0),
        new CommonArea(CommonArea.SOCCER_FIELD, 0),
        new CommonArea(CommonArea.TENNIS_FIELD, 0),
        new CommonArea(CommonArea.PARK, 0)
    ];

    constructor(name: string, provincia: string, canton: string, distrito: string, senia: string, contactName: string, phonenumber: string) {
        this.name = name;
        this.provincia = provincia;
        this.canton = canton;
        this.distrito = distrito;
        this.senias = senia;
        this.contactname = contactName;
        this.phonenumber  = phonenumber;
    }
}

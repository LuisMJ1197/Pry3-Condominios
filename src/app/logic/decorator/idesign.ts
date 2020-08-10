import { House } from '../modeling/house';

export interface IDesign {
    getHouse(): House;
    createImage(canvas: HTMLCanvasElement);
    getImage();
}

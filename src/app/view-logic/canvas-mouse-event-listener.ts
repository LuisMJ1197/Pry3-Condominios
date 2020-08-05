import { Drawable } from '../logic/drawing/drawable';

export interface CanvasMouseEventListener {
    refresh(): void;
    registerChange(object: Drawable);
}

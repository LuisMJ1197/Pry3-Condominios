import { Drawable } from '../logic/drawing/drawable';
import { ISnapshot } from '../logic/memento/isnapshot';

export interface CanvasMouseEventListener {
    refresh(): void;
    registerChange(object: Drawable);
}

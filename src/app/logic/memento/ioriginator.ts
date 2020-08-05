import { ISnapshot } from './isnapshot';

export interface IOriginator {
    save(): ISnapshot;
    restore(snapshot: ISnapshot): void;
}

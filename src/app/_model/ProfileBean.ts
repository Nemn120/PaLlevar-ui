import { ProfileMenuOptionBean } from './ProfileMenuOptionBean';
import { MainBean } from './MainBean';

export class ProfileBean extends MainBean{
    idProfile: number;
    shortDescription: string;
    longDescription:string;
    listProfileMenuOption:ProfileMenuOptionBean[];
}
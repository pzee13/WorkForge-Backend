import { WorkSpace } from "../../../domainLayer/workSpace";


export interface SpaceRepository{
    createSpace(newSpace:WorkSpace):Promise<string>;
    updateSpaceStatus(id: string, isAccepted: boolean): Promise<string | null>;
}





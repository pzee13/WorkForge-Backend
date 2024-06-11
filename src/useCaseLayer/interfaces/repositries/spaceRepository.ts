import { WorkSpace } from "../../../domain/workSpace";
import { SpaceType } from "../../../domain/spaceType";

export interface SpaceRepository{
    createSpaceType(newSpaceType: SpaceType): Promise<string>;
    createSpace(newSpace:WorkSpace):Promise<string>;
    existingSpaceType(spaceType:string):Promise<SpaceType|null>;
    isExistingType(spaceType:string,_id:string):Promise<SpaceType|null>;
    updateSpaceStatus(id: string, isAccepted: boolean): Promise<string | null>;
    updateSpaceType(data: SpaceType): Promise<SpaceType>;
    
}





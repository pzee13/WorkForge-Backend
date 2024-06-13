import { WorkSpace } from "../../../domain/workSpace";
import { SpaceType } from "../../../domain/spaceType";
import { SpaceRepository } from "../../../usecase/interfaces/repositries/spaceRepository";
import SpaceModel from "../model/spaceModel";
import SpaceTypeModel from "../model/spaceTypeModel";
import { createSpace } from "./spaces/createSpace";
import { updateSpaceStatus } from "./spaces/updateSpaceStatus";
import { createSpaceType } from "./spaces/createSpaceType"; 
import { existingSpaceType } from "./spaces/existingSpaceType"
import { updatedSpaceType } from "./spaces/updateSpaceType";
import { isExistingType } from "./spaces/isExistingType"

export class SpaceRepositries implements SpaceRepository{
    constructor(private readonly spaceModel:typeof SpaceModel,
        private readonly spaceTypeModel:typeof SpaceTypeModel
    ){}

    async createSpace(newSpace: WorkSpace): Promise<string> {
        return createSpace(newSpace,this.spaceModel)
    }

    async updateSpaceStatus(id: string, isAccepted: boolean): Promise<string> {
        return updateSpaceStatus(id, isAccepted, this.spaceModel);
      }

    async createSpaceType(newSpaceType: SpaceType): Promise<string> {
        return createSpaceType(newSpaceType, this.spaceTypeModel)
    }

    async existingSpaceType(spaceType:string):Promise<SpaceType | null>{
        return existingSpaceType(spaceType ,this.spaceTypeModel)
    }

    async updateSpaceType(newSpaceType: SpaceType): Promise<SpaceType | never> {
        return updatedSpaceType(newSpaceType,this.spaceTypeModel)
    }

    async isExistingType(spaceType:string,_id:string):Promise<SpaceType | null>{
        return isExistingType(spaceType,this.spaceTypeModel,_id)
    }
}
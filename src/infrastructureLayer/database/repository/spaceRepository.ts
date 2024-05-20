import { WorkSpace } from "../../../domainLayer/workSpace";
import { SpaceRepository } from "../../../useCaseLayer/interfaces/repositries/spaceRepository";
import SpaceModel from "../model/spaceModel";
import { createSpace } from "./spaces/createSpace";
import { updateSpaceStatus } from "./spaces/updateSpaceStatus";

export class SpaceRepositries implements SpaceRepository{
    constructor(private readonly spaceModel:typeof SpaceModel){}

    async createSpace(newSpace: WorkSpace): Promise<string> {
        return createSpace(newSpace,this.spaceModel)
    }

    async updateSpaceStatus(id: string, isAccepted: boolean): Promise<string> {
        return updateSpaceStatus(id, isAccepted, this.spaceModel);
      }
}
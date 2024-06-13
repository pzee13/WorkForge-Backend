import { SpaceType } from "../../../../domain/spaceType";
import SpaceTypeModel from "../../model/spaceTypeModel";

export const createSpaceType = async(
    newSpaceType:SpaceType,
    spaceTypeModel:typeof SpaceTypeModel
):Promise<string> =>{
    try{
        const spaceType = await spaceTypeModel.create(newSpaceType);
        await spaceType.save()
        return "Successfully created a Space category";   
    }catch(error){
        throw error
    }
}
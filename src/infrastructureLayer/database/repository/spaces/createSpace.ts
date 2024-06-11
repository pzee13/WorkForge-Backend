import { WorkSpace } from "../../../../domain/workSpace";
import SpaceModel from "../../model/spaceModel"

export const createSpace = async(
    newSpace:WorkSpace,
    spaceModel:typeof SpaceModel
):Promise<string> =>{
    try{
        const space = await spaceModel.create(newSpace);
        await space.save()
        return "Successfully created a space";   
    }catch(error){
        throw error
    }
}
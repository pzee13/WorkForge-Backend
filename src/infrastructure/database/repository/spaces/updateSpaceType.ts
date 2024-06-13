import { SpaceType } from "../../../../domain/spaceType";
import SpaceTypeModel from "../../model/spaceTypeModel";


export const updatedSpaceType = async (
    updatedSpaceType: SpaceType,
    spaceModels: typeof SpaceTypeModel
): Promise<SpaceType | never> => {
    try {
       
        const updatedSpaceTypes = await spaceModels.findOne({ _id: updatedSpaceType._id})
        if (updatedSpaceTypes) {
            // Assuming isStatus is a property on the user model
            updatedSpaceTypes.spaceTypeName = updatedSpaceType.spaceTypeName
            updatedSpaceTypes.description = updatedSpaceType.description
            updatedSpaceTypes.availableSpace = updatedSpaceType.availableSpace
            updatedSpaceTypes.peopleAllowed = updatedSpaceType.peopleAllowed
            await updatedSpaceTypes.save();
            return updatedSpaceTypes;
        }
        throw new Error("Internal Server Error") 
    } catch (error) {
        throw error;
    }
}

import ErrorResponse from "../../handlers/errorResponse";
import { SpaceRepository } from "../../interfaces/repositries/spaceRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import { IResponse } from "../../interfaces/services/response";

export const createSpaceType = async(

    requestValidator:IRequestValidator,
    spaceRepository:SpaceRepository,
    spaceTypeName:string,
    description: string,
    peopleAllowed: boolean,
    availableSpace: boolean,
): Promise<string> => {
    try{
        const validation = requestValidator.validateRequiredFields(
            {
                spaceTypeName,
                description,
                peopleAllowed,
                availableSpace,
            },[
                "spaceTypeName",
                "description",
                "peopleAllowed",
                "availableSpace",
            ]
        );

        if (!validation.success) {
          throw ErrorResponse.badRequest(validation.message as string);
        }

        const isAlreadyExist =await spaceRepository.existingSpaceType(spaceTypeName)
       if(!isAlreadyExist){
        const newSpaceType = {
            spaceTypeName,
            description,
            peopleAllowed,
            availableSpace,
        }

        const createNewSpaceType = await spaceRepository.createSpaceType(newSpaceType);
        return createNewSpaceType
    }else{ 
        throw ErrorResponse.badRequest("Space type alreadhy exist"); 
    }

    }catch(err){
        throw err;
    }
}
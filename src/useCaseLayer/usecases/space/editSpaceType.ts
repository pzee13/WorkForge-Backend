import { SpaceRepository } from "../../interfaces/repositries/spaceRepository";
import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import ErrorResponse from "../../handlers/errorResponse";
import { SpaceTypeResponse } from '../../interfaces/services/response';

export const editSpaceType = async (
    requestValidator: IRequestValidator,
    spaceRepository: SpaceRepository,
    _id: string,
    spaceTypeName: string,
    description: string,
    peopleAllowed: boolean,
    availableSpace: boolean,
): Promise<SpaceTypeResponse> => {
    try {
        console.log("creating user ...");

        const validation = requestValidator.validateRequiredFields(
            {
                _id,
                spaceTypeName,
                description,
                peopleAllowed,
                availableSpace,
            }, [
                "_id",
                "spaceTypeName",
                "description",
                "peopleAllowed",
                "availableSpace",
            ]
        );

        if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
        }

        const isExistingType = await spaceRepository.isExistingType(spaceTypeName,_id);

        if (!isExistingType) {
            const data = {
                _id,
                spaceTypeName,
                description,
                peopleAllowed,
                availableSpace,
            };

            const updatedSpaceType = await spaceRepository.updateSpaceType(data);

            return {
                status: 200,
                success: true,
                message: `Successfully Upadted Space types`,
                data: updatedSpaceType
            };
        } else {
            throw ErrorResponse.badRequest("Space type already exist"); 
        }
    } catch (error) {
        throw error;
    }
};

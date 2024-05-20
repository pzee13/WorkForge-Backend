import { IRequestValidator } from "../../interfaces/repositries/validRepository";
import ErrorResponse from "../../handlers/errorResponse";
import { SpaceRepository } from "../../interfaces/repositries/spaceRepository";


export const createSpace = async(
    requestValidator:IRequestValidator,
    spaceRepository:SpaceRepository,
    providerId:string,
    spaceName:string,
    spaceType:string,
    state:string,
    district:string,
    city:string,
    areaName:string,
    buildingName:string,
    description:string,
    floor:string,
    images:string[] | null,
    chargePerHour:number,
    availableSpaces:number,
    contactNumber:string,
    facilities:string[]|null,
    rentalAgreement:string,
    // startService:Date,
    // endService:Date,
    latitude:number,
    longitude:number,
): Promise<string> => {
    try{
        const validation = requestValidator.validateRequiredFields(
            {
                providerId,
                spaceName,
                spaceType,
                state,
                district,
                city,
                areaName,
                buildingName,
                description,
                floor,
                images,
                chargePerHour,
                availableSpaces,
                contactNumber,
                facilities,
                rentalAgreement,
                // startService,
                // endService,
                latitude,
                longitude,
              },
              [
                "providerId",
                "spaceName",
                "spaceType",
                "state",
                "district",
                "city",
                "areaName",
                "buildingName",
                "description",
                "floor",
                "images",
                "chargePerHour",
                "availableSpaces",
                "contactNumber",
                "facilities",
                "rentalAgreement",
                // "startService",
                // "endService",
                "latitude",
                "longitude",
              ]
          );

          if (!validation.success) {
            throw ErrorResponse.badRequest(validation.message as string);
          }

          const newSpace ={
            providerId,
            spaceName,
            spaceType,
            state,
            district,
            city,
            areaName,
            buildingName,
            description,
            floor,
            images,
            chargePerHour,
            availableSpaces,
            contactNumber,
            facilities,
            rentalAgreement,
            // startService,
            // endService,
            latitude,
            longitude,
          }



          const createNewSpace = await spaceRepository.createSpace(newSpace)
          return createNewSpace

    }catch(err){
        throw err;
    }
}
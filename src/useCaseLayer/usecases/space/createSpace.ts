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
    country:string,
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
      console.log("11",spaceType,spaceName)
        const validation = requestValidator.validateRequiredFields(
            {
                providerId,
                spaceName,
                spaceType,
                state,
                district,
                country,
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
                "country",
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
            country,
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

          console.log("22",newSpace.spaceType)

          const newType = await spaceRepository.existingSpaceType(spaceType);
          console.log("loggin",newType)
          if(newType){
            const createNewSpace = await spaceRepository.createSpace(newSpace)
            return createNewSpace
          }else{
            throw ErrorResponse.badRequest("We do not accept these space types"); 
          }

    }catch(err){
        throw err;
    }
}